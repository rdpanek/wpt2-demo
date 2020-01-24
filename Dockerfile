FROM rdpanek/wpt2-demo:d.2.18
MAINTAINER Radim Daniel Pánek <rdpanek@gmail.com>

ENV APP_DIR /opt/wpt2/
ENV TEST_DIR ${APP_DIR}/test/

# Create app directory
RUN mkdir -p ${APP_DIR} && \
    chown -R node:node ${APP_DIR} && \
    mkdir -p ${TEST_DIR}
WORKDIR ${APP_DIR}
COPY test/ ${TEST_DIR}
RUN ls -lah $APP_DIR && \
    ls -lah $TEST_DIR/performanceTesting

USER node

ENTRYPOINT [ "./node_modules/.bin/wdio" ]
