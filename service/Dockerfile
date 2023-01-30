FROM python:3.11-alpine as base
FROM base as builder


RUN apk add --no-cache --virtual .build-deps make g++
RUN apk add --update libffi-dev
RUN apk add --update zlib-dev
RUN apk add --update jpeg-dev
RUN apk add --update openjpeg-dev
RUN apk add --update python3-dev
# RUN apk add --update musl-dev
# RUN apk add --update postgresql-dev

RUN apk add --update git
# RUN /usr/local/bin/python -m pip install --upgrade pip

RUN mkdir /install
WORKDIR /install

# For recollecting python packages from git repository
RUN pip install --prefix=/install --no-cache-dir poetry

COPY service/requirements.txt /requirements.txt
RUN pip install --prefix=/install --no-binary multidict,yarl -r /requirements.txt
# RUN pip install --prefix=/install --no-cache-dir psycopg2

ONBUILD RUN apk del .build-deps

FROM base


RUN apk add --update libffi
RUN apk add --update zlib
RUN apk add --update libjpeg
RUN apk add --update openjpeg
RUN apk add --update postgresql-libs

RUN apk add --update git
RUN apk add --update curl

COPY --from=builder /install /usr/local
# Node.js package
# RUN apk add --update nodejs npm

COPY service/test4 /test4
COPY service/reports /reports
COPY service/manage.py /

RUN mkdir -p /test4/static
RUN mkdir -p /media
RUN mkdir -p /static

# HOT-DEVELOPMENT DEPENDENCY SECTION
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN apk add --no-cache --virtual .build-deps make g++
RUN apk add --update python3-dev
RUN /usr/local/bin/pip3 install poetry
# ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
# RUN /usr/local/bin/pip3 uninstall -qq -y strawberry-django-plus
RUN /usr/local/bin/pip3 install "git+https://github.com/usalko/strawberry.git@fix-fields-order"
RUN /usr/local/bin/pip3 install "git+https://github.com/usalko/strawberry-django-plus.git@distinct-feature"
# SECTION END

WORKDIR /

ENV PYTHONPATH "${PYTHONPATH}:/usr/local/lib/python3.9/site-packages:/app"

# RUN ls -la /app
RUN ls -la /usr/local/lib/python3.11/site-packages
ENV HTTP_PORT=8000
ENV HTTP_HOST=0.0.0.0
EXPOSE ${HTTP_PORT}
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
