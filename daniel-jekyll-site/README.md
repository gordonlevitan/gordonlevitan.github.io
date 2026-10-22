# Daniel Gordon-Levitan — Jekyll website

80s-themed academic homepage powered by Jekyll and GitHub Pages.

## Publish on GitHub Pages

1. Extract this ZIP. Upload the **contents** of this folder (not the enclosing folder) to the root of a public GitHub repository.
2. For a personal site, name the repository `YOUR-USERNAME.github.io`. Keep `baseurl: ""` in `_config.yml`.
3. For a regular repository, set `baseurl: "/YOUR-REPOSITORY-NAME"` in `_config.yml`.
4. On GitHub go to **Settings > Pages > Build and deployment** and choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
5. Wait for the Pages deployment to finish. Your personal site URL is `https://YOUR-USERNAME.github.io/`; a project site URL is `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`.

## Photo troubleshooting

The portrait lives at `assets/images/profile.png`. The HTML uses Jekyll's `relative_url` filter so the image works both on a user site and on a project site. Keep the file and directory names exactly as shown (case-sensitive). Check the deployed image URL if it fails.

## Edit

Edit `index.html` to change text, social links, and styling. The course motivation section says: **NOT TO BE STUCK IN THE PAST**.

## Local preview (optional)

Install Ruby and Bundler, then run `bundle install` and `bundle exec jekyll serve`. Open `http://localhost:4000`.
