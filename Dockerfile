FROM ruby:3.1.2-alpine3.16

ENV TZ=Asia/Tokyo

ENV APP_ROOT /sample_app

RUN mkdir -p ${APP_ROOT}

WORKDIR ${APP_ROOT}

COPY Gemfile Gemfile.lock ${APP_ROOT}/

RUN apk update && apk add --no-cache \
        libc6-compat \
        nodejs \
        postgresql-client \
        tzdata \
        yarn \
 && apk add --no-cache --virtual .build-dependencies \
        build-base \
        postgresql-dev \
        gcc musl-dev make libffi-dev openssl-dev\
 && bundle config set --jobs 4 \
 && bundle install \
 && apk del .build-dependencies

COPY . ${APP_ROOT}
