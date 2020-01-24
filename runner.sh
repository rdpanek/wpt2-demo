#!/bin/bash
for i in `seq 1 1`;
do
echo "otoceni: ${i}"

docker run --name framework --rm -ti \
-e ENV=localhost \
-e ELASTIC_CLUSTER=elastic:9200 \
-e WAIT_FOR_TIMEOUT=5000 \
--link elastic:elastic \
--link selen:selen \
dan/framework:1.0 \
--spec /test/performanceTesting/smoke.js \
--baseUrl=https://www.performance-testing.cz \
--hostname=selen \
--logLevel=error

done