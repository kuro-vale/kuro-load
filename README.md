# kuro-load

A repository to save my load testing scripts of my apps

### Quick-Start

Start Grafana and prometheus services

```shell
docker compose up -d prometheus grafana
```

After the services are initialized add a new datasource to grafana ```http://prometheus:9090/``` and import the 
[k6 Dashboard](https://grafana.com/grafana/dashboards/18030-official-k6-test-result/).

Then run the desired script

```shell
.\docker-run.ps1 .\scripts/sample.js
```

More info in the [Docs](https://k6.io/docs/results-output/real-time/prometheus-remote-write/)