FROM php:8.1-apache

# load version info from arguments
ARG release
ARG patch

# add helper script
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

# install extra packages
RUN apt-get update \
	&& apt-get install -y \
		graphviz \
		mariadb-client \
		unzip \
	&& chmod uga+x /usr/local/bin/install-php-extensions \
	&& install-php-extensions \
		apcu \
		gd \
		ldap \
		mcrypt \
		mysqli \
		soap \
		zip

# Load iTop files
RUN curl -L -o /tmp/iTop.zip https://sourceforge.net/projects/itop/files/itop/3.1.0-2/iTop-3.1.0-2-11973.zip \
	&& unzip /tmp/iTop.zip -d /tmp/ web/* \
	&& mv -v /tmp/web/* /var/www/html/ \
	&& mkdir /var/www/html/env-production \
	&& chown -R www-data: /var/www/html/ \
	&& rm -rf /tmp/iTop.zip /tmp/web


# Php config default
ENV PHP_TIMEZONE=${PHP_TIMEZONE} \
    PHP_ENABLE_UPLOADS=${PHP_ENABLE_UPLOADS} \
    PHP_MEMORY_LIMIT=${PHP_MEMORY_LIMIT} \
    PHP_POST_MAX_SIZE=${PHP_POST_MAX_SIZE} \
    PHP_UPLOAD_MAX_FILESIZE=${PHP_UPLOAD_MAX_FILESIZE} \
    PHP_MAX_FILE_UPLOADS=${PHP_MAX_FILE_UPLOADS} \
    PHP_MAX_INPUT_TIME=${PHP_MAX_INPUT_TIME} \
    PHP_LOG_ERRORS=${PHP_LOG_ERRORS} \
    PHP_ERROR_REPORTING=${PHP_ERROR_REPORTING}

# Add custom entrypoint
COPY docker-itop-entrypoint.sh /usr/local/bin/docker-itop-entrypoint
RUN chmod +x /usr/local/bin/docker-itop-entrypoint
ENTRYPOINT ["docker-itop-entrypoint"]
CMD ["apache2-foreground"]