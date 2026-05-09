FROM wordpress:php8.3-apache

# Copy all custom wp-content files into the WordPress image
COPY ./wp-content /var/www/html/wp-content

# Set appropriate permissions
RUN chown -R www-data:www-data /var/www/html/wp-content
