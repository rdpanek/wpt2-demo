# WPT2
> Frontend analyzer & Web Performance Stack

## Elasticsearch

### Run Elasticsearch
```
docker run --ulimit nofile=90000:90000 --name elastic -d -p 9200:9200 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.7.1 bin/elasticsearch -Enetwork.host=0.0.0.0
```

### Install mapping
```
curl -XPUT "http://192.168.1.237:9200/_template/wpt2-performance-entries" -H 'Content-Type: application/json' -d'
{
  "index_patterns": ["wpt2-performance-entries-*"],
  "settings": {
    "number_of_shards": 2,
    "number_of_replicas" : 1,
    "index.translog.durability": "async",
    "index.refresh_interval": "10s"
  },
  "version": 1,
  "mappings": {
    "wpt2-performance-entries": {
      "dynamic": "strict",
      "properties": {
        "connectEnd": {
          "type": "float"
        },
        "connectStart": {
          "type": "float"
        },
        "decodedBodySize": {
          "type": "integer"
        },
        "domComplete": {
          "type": "float"
        },
        "domContentLoadedEventEnd": {
          "type": "float"
        },
        "domContentLoadedEventStart": {
          "type": "float"
        },
        "domInteractive": {
          "type": "float"
        },
        "domainLookupEnd": {
          "type": "float"
        },
        "domainLookupStart": {
          "type": "float"
        },
        "duration": {
          "type": "float"
        },
        "encodedBodySize": {
          "type": "integer"
        },
        "sequence" : {
          "type" : "long"
        },
        "entryType": {
          "type": "keyword"
        },
        "fetchStart": {
          "type": "float"
        },
        "initiatorType": {
          "type": "keyword"
        },
        "loadEventEnd": {
          "type": "float"
        },
        "loadEventStart": {
          "type": "float"
        },
        "name": {
          "type": "keyword"
        },
        "nextHopProtocol": {
          "type": "keyword"
        },
        "redirectCount": {
          "type": "short"
        },
        "redirectEnd": {
          "type": "float"
        },
        "redirectStart": {
          "type": "float"
        },
        "requestStart": {
          "type": "float"
        },
        "responseEnd": {
          "type": "float"
        },
        "responseStart": {
          "type": "float"
        },
        "responseTime": {
          "type": "float"
        },
        "ttfb": {
          "type": "float"
        },
        "secureConnectionStart": {
          "type": "float"
        },
        "serverTiming": {
          "type": "object"
        },
        "startTime": {
          "type": "float"
        },
        "toJSON": {
          "type": "object"
        },
        "transferSize": {
          "type": "long"
        },
        "type": {
          "type": "keyword"
        },
        "unloadEventEnd": {
          "type": "float"
        },
        "unloadEventStart": {
          "type": "float"
        },
        "workerStart": {
          "type": "float"
        },
        "timestamp": {
          "type": "date"
        },
        "uuidAction": {
          "type": "text"
        },
        "env": {
          "type": "keyword"
        },
        "spec": {
          "type": "keyword"
        },
        "context": {
          "type": "keyword"
        }
      }
    }
  }
}'
```

## WPT2 stack

### Run Selenium Standalone
```
java -Dwebdriver.chrome.driver=chromedriver76 -jar selenium-server-standalone-3.141.59.jar --debug
```

### Run WPT2 test
```
docker run --name wpt2 -it --rm \
-v `pwd`/test/:/test/ \
-e ELASTIC_CLUSTER=http://192.168.1.237:9200 \
-e WAIT_FOR_TIMEOUT=60000 \
-e ENV=performanceTesting \
rdpanek/wpt2-demo:d.2.10 --spec /test/performanceTesting/smoke.js --hostname=192.168.1.237
```

**Available options**
> WPT2 is based on [https://webdriver.io](https://webdriver.io)

`--spec` testCase, example `./test/testCase.js`

`--baseUrl` URI of web app, example `https://target.app`

`--hostname` selenium without port, port is default 4444 `194.182.85.208`

### Available enviroment variables

`WAIT_FOR_TIMEOUT` explicit wait for wdio wait* commands

`ATTACHMENTS` can be `allow` and will be create screenshot when will error fired and sending to Elasticsearch just attachment label in wpt2-report-* index. Screenshot will be send to S3 in format `time-uuidAction.png`. In this case is used `signatureVersion: v4`. In case, when Elasticsearch will be not used, will be screenshot saved to `attachments` directory.

`AWS_S3_ACCESS_KEY` for storage screenshot to S3

`AWS_S3_SECRET_KEY` for storage screenshot to S3

`AWS_S3_REGION` default is `eu-central-1`

`AWS_S3_BUCKET` default is `e2e-report-attachments`

`USER` username for TC, which use login to app

`PASS` password for TC, which use login to app

`ELASTIC_CLUSTER` URI to elastic including the port

`ELASTIC_HTTP_AUTH` string with `user:pass`

`PT_AUDIT` not allowed

`RESPONSE_INTERCEPT` not allowed

`REQUEST_INTERCEPT` not allowed

`CONSOLE_INTERCEPT` not allowed

`ENV` enviroment. For example, `localhost`, `production`, `FR1` atp.

`ATTACHMENTS` can be true and will be create screenshot and html source when error and sending to Elasticsearch just attachment event. Screenshot will be upload to S3.
