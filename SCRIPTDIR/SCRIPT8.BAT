@ECHO OFF
echo eyJhbGciOiAiSFMyNTYiLCAidHlwZSI6ICJKV1QifSANCg.eyJOYW1lIjogIlBhdHJpY2sgUGF5bmUiLCAidXNlcl9pZCI6ICJwYXRyaWNrcCIsICJpYXQiOiAxNTM4OTc5MTA4fSANCg | openssl dgst -binary -sha256 -hmac "secret" | openssl enc -base64 2> SCRIPT8.BAT.STDERR
