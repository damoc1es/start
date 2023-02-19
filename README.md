# start

Code for startpage at [start.damocles.dev](https://start.damocles.dev).

The link format is basically a tree, with every branch having at most 10 links/further branches (keyboard controllable).

To use, open settings (top) and add links (the format is `yaml`):
- link:
```yaml
- link_name: 'https://example.com'
```

- another branch:
```yaml
- branch_name:
    - link_name1: 'https://github.com'
    - link_name2: 'https://example.com'
```
then click `Save` (it will also save to LocalStorage, but I recommend having a backup on something like `gist`)

## Example
```yaml
- personal:
  - GitHub: 'https://github.com'
  - another set, nested:
    - Google: 'https://google.com'
    - Reddit: 'https://www.reddit.com'

- social:
  - Discord: 'https://discord.com/channels/@me'
  - Mastodon: 'https://mastodon.social'
```
