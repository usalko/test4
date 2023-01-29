FROM python:3.11-alpine as base
FROM base as builder


RUN apk add --no-cache --virtual .build-deps make g++
RUN apk add --update libffi-dev
RUN apk add --update zlib-dev jpeg-dev openjpeg-dev tiff-dev
#RUN apk --update add libxml2-dev libxslt-dev libffi-dev gcc musl-dev libgcc openssl-dev curl
#RUN apk add jpeg-dev zlib-dev freetype-dev lcms2-dev openjpeg-dev tiff-dev tk-dev tcl-dev


RUN mkdir /install
WORKDIR /install

COPY requirements.txt /requirements.txt
RUN pip install --prefix=/install --no-binary multidict,yarl -r /requirements.txt


ONBUILD RUN apk del .build-deps

FROM base


RUN apk add --update libffi
RUN apk add --update zlib
RUN apk add --update jpeg
RUN apk add --update openjpeg
RUN apk add --update tiff

# Additional tools
RUN apk add --update curl
RUN apk add --update bash


COPY --from=builder /install /usr/local

COPY ./service /service

RUN addgroup -g 1000 service
RUN adduser -u 1000 -G service -h /service -D service

# Switch to user
USER 1000:1000

WORKDIR /

ENV PYTHON_VERSION="3.11"
ENV PYTHONPATH "${PYTHONPATH}:/usr/local/lib/python${PYTHON_VERSION}/site-packages:/"

# LS SITE PACKAGES
RUN ls -la /usr/local/lib/python${PYTHON_VERSION}/site-packages
ENV SERVICE_HTTP_PORT=8111
ENV HTTP_HOST=0.0.0.0
EXPOSE ${SERVICE_HTTP_PORT}
ENTRYPOINT ["uvicorn", "--port", "${SERVICE_HTTP_PORT}", "--host", "0.0.0.0", "service.index:app", "--reload"]
