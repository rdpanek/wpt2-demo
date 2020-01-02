# WPT2
> Frontend analyzer & Web Performance Stack

## Tools instalation
```
apt-get update && apt-get install vim git tig unzip htop -y
```


## Instalation WPT2 stack on Ubuntu droplet

### Elasticsearch

The vm.max_map_count kernel setting must be set to at least 262144 for production use.

`sysctl -w vm.max_map_count=262144`
More information: https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html

Run Elasticsearch in docker container 
```
docker run --name elastic -d -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.7.1 bin/elasticsearch -Enetwork.host=0.0.0.0
```

### Kibana
```
docker run --name kibana -d --link elastic:elasticsearch -p 5601:5601 docker.elastic.co/kibana/kibana:6.7.1
```

### Selenium
```
docker run -d -p 4444:4444 -v /dev/shm:/dev/shm selenium/standalone-chrome:3.141.59-yttrium
```

### Install Google Chrome
**Download package**

`wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
`

**Installation**

`sudo dpkg -i google-chrome-stable_current_amd64.deb`

**Open as root**

`google-chrome --no-sandbox`


## Add performance entries mapping
- Open Kibana (localhost:5601) > DevTools > paste mapping:
```
PUT _template/wpt2-performance-entries
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
}
```

### Run WPT2 test
```
./runner.sh
```

### Available options
> This solutions is based on [https://webdriver.io](https://webdriver.io)

`--spec` testCase, example `./test/testCase.js`

`--baseUrl` URI of web app, example `https://target.app`

`--hostname` selenium without port, port is default 4444

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

`ENV` enviroment. For example, `localhost`, `digitaOcean`, `FR1` atp.

`INDEX_PREFIX` default is empty. For example `dev-` WPT2 create `dev-wpt2-report-*`

### Compactibility
- chromedriver 76
- chrome 76
- Selenium `selenium/standalone-chrome-debug:3.141.59-titanium`
- Elasticsearch `6.8.x`

## How to install Kubectl
https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-linux


**How use with my configuration**

`kubectl --kubeconfig=myConfiguration.yaml get pods`


## VNC

### Instalation

`apt install ubuntu-gnome-desktop tigervnc-standalone-server tigervnc-common tigervnc-xorg-extension tigervnc-viewer -y`

**Configuration**

Create a directory

`mkdir /etc/vnc`

Create a configuration file

`touch /etc/vnc/xstartup`, open `vim /etc/vnc/xstartup` and add:  

```
#!/bin/bash
unset SESSION_MANAGER
exec /etc/X11/xinit/xinitrc
```

**vncserver / commands **

`vncserver -kill :1` kill all instances

`vncserver -list` list all instaces

`vncserver :1 -localhost` start VNC server

`ssh -L 5901:localhost:5901 root@xyz` connect

and now open your favorite VNC viewver with `localhost:5901` URI.