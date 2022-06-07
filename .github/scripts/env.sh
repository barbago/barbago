# https://stackoverflow.com/questions/60176044/how-do-i-use-an-env-file-with-github-actions

echo $ENV_FILE | base64 --decode > ui/.env
cat ui/.env
