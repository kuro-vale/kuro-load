param($script)

cat $script | docker compose run --rm -T k6 run -