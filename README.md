<p align="center">
  <a href="https://nvimluau.dev">
    <h1 align="center">NVIMLUAU</h1>
  </a>
</p>

## NVIMLUAU

Get your hawaiin shirts, it's a Neovim plugin party. This project was made for good simple fun. The stack is..
- NextJS
- tailwind

## How it works..

1. On https://nvimluau.dev/publish, add the GitHub URL for the plugin repo
2. Submitting creates a PR with a markdown file as the commit in the nvimluau repo
3. And after I'm done eating pineapple, i'll merge it.

## If you want to help develop this

`npm i`
`npm run dev`

### Note to anyone who does want to work on this locally.
If you want to test the repo submission form, you will need a GitHub secret and email to provide values for an `.env` file.
```bash
# .env

GH_TOKEN=
NEXT_PUBLIC_GH_TOKEN=
SECRET_EMAIL=
```

To create a GH Token..
Go to https://github.com > settings > developer settings

create a token, then plop it into your .env values

## TODO

1. setup cron job to update plugin data
2. make mobile friendly
