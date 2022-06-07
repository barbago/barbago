# https://stackoverflow.com/questions/60176044/how-do-i-use-an-env-file-with-github-actions
# Save the result of `cat ui/.env | base64 -w 0` into GitHub Secret ENV_FILE

echo $ENV_FILE | base64 --decode > ui/.env
