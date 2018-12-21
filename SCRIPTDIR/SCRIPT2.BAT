@ECHO OFF
echo eyJhbGciOiAiSFMyNTYiLCAidHlwZSI6ICJKV1QifSANCg.eyJOYW1lIjogIlBhdHJpY2sgUGF5bmUiLCAidXNlcl9pZCI6ICJwYXRyaWNrcCIsICJpYXQiOiAxNTQwMjAzNzA0fSANCg | openssl dgst -binary -sha256 -hmac "secret" | openssl enc -base64 2> SCRIPT2.BAT.STDERR
