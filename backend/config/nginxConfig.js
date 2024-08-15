const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const templateContent = `##
# Redirect to www
##
server {
    listen 443 ssl http2;
    listen 80;
    server_name {{DOMAIN}};

    ssl_certificate /etc/nginx/ssl/{{DOMAIN}}/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/{{DOMAIN}}/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';

    return 301 $scheme://www.$host$request_uri;
}

server {    
    listen 443 ssl http2;
    listen 80;

    root /var/www/{{DOMAIN}}/{{PUBLIC_FOLDER}};
    index index.php index.html index.htm;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    
    # Make site accessible from http://localhost/
    server_name www.{{DOMAIN}};

    ssl_certificate /etc/nginx/ssl/{{DOMAIN}}/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/{{DOMAIN}}/privkey.pem;
    ssl_dhparam /etc/nginx/ssl/dhparam.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;  # Update this according to your PHP-FPM version and socket path
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    error_page 404 =200 /index.html;
}
`;

function createNginxConfig(domain, publicFolder, callback) {
    const configContent = templateContent
        .replace(/{{DOMAIN}}/g, domain)
        .replace(/{{PUBLIC_FOLDER}}/g, publicFolder);

    const configPath = path.join(__dirname, `${domain}.conf`);

    fs.writeFile(configPath, configContent, 'utf8', (err) => {
        if (err) {
            callback(`Error writing Nginx config file: ${err.message}`);
            return;
        }

        exec(`sudo cp ${configPath} /etc/nginx/sites-available/${domain} && sudo ln -s /etc/nginx/sites-available/${domain} /etc/nginx/sites-enabled/ && sudo nginx -t && sudo systemctl reload nginx`, (error, stdout, stderr) => {
            if (error) {
                callback(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                callback(`Stderr: ${stderr}`);
                return;
            }
            callback(null, `Nginx configuration for ${domain} created and enabled`);
        });
    });
}

function addDnsRecord(zoneId, recordId, domain, ip, callback) {
    const dnsRecordContent = `
Zone ID: ${zoneId}
Record ID: ${recordId}
Name: ${domain}
Class: IN
Type: A
Status: Active
Value: ${ip}
TTL: 28800
Creation Date: ${new Date().toISOString()}
`;

    const dnsConfigPath = path.join(__dirname, `${domain}_dns_record.txt`);

    fs.writeFile(dnsConfigPath, dnsRecordContent, 'utf8', (err) => {
        if (err) {
            callback(`Error writing DNS record file: ${err.message}`);
            return;
        }

        callback(null, `DNS record for ${domain} saved to ${dnsConfigPath}`);
    });
}

module.exports = { createNginxConfig, addDnsRecord };
