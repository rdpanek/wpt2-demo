#!/bin/bash
for i in `seq 1 1`;
do
echo "otoceni: ${i}"

docker run --name wpt2 --rm -ti \
-e ENV=localhost \
-e ELASTIC_CLUSTER=elastic:9200 \
-e WAIT_FOR_TIMEOUT=5000 \
--link elastic:elastic \
--link selen:selen \
-v `pwd`/test:/test/ \
rdpanek/wpt2-demo:d.2.18 \
--spec /test/performanceTesting/smoke.js \
--baseUrl=https://www.performance-testing.cz \
--hostname=selen \
--logLevel=error

done