# Nixuge's Vendetta Plugins
Some plugins for Vendetta [Vendetta](https://github.com/vendetta-mod/Vendetta), or its up to date fork [Bunny](https://github.com/pyoncord/Bunny)

## TODO - REPO
Landing page & remove the jank thing in deploy.yml.

# Plugins
## URL Overrides
A plugin that allows you to redirect some urls to other.

### How to use:
Should be pretty straight forwards. If you use regex groups, you can use them by placing "$n" with n being the index of the group (starts at 1)
### Examples
<!-- Using html tables because otherwise I have to escape the |s in the "from" which i DO NOT want to do. -->
<details>
  <summary><strong>Twitter: Open User Profiles in App</strong></summary>
  <br>
<table>
  <tr>
    <td><strong>Property</strong></td>
    <td><strong>Value</strong></td>
  </tr>
  <tr>
    <td>Regex</td>
    <td>✅</td>
  </tr>
    <tr>
    <td>In-App Browser</td>
    <td>🟡</td>
  </tr>
    <tr>
    <td>From</td>
    <td><code>https:\/\/(?:(?:vx|fx|)twitter|x|flixup).com\/(?!.*\bstatus\b)(.*?)(?:\/|\?| |$)</code></td>
  </tr>
  <tr>
    <td>To</td>
    <td><code>twitter://user?screen_name=$1</code></td>
  </tr>
</table>

</details>

<details>
  <summary><strong>Twitter: Open Tweets in App</strong></summary>
  <br>
<table>
  <tr>
    <td><strong>Property</strong></td>
    <td><strong>Value</strong></td>
  </tr>
  <tr>
    <td>Regex</td>
    <td>✅</td>
  </tr>
    <tr>
    <td>In-App Browser</td>
    <td>🟡</td>
  </tr>
    <tr>
    <td>From</td>
    <td><code>https:\/\/(?:(?:vx|fx|)twitter|x|flixup).com\/.*?\/status\/(\d{19})</code></td>
  </tr>
  <tr>
    <td>To</td>
    <td><code>twitter://status?id=$1</code></td>
  </tr>
</table>

</details>

<details>
  <summary><strong>Reddit: Open URLs in App</strong></summary>
  <br>
<table>
  <tr>
    <td><strong>Property</strong></td>
    <td><strong>Value</strong></td>
  </tr>
  <tr>
    <td>Regex</td>
    <td>✅</td>
  </tr>
    <tr>
    <td>In-App Browser</td>
    <td>🟡</td>
  </tr>
    <tr>
    <td>From</td>
    <td><code>https:\/\/((?:(?:.*?)\.|)reddit\.com\/(.*))</code></td>
  </tr>
  <tr>
    <td>To</td>
    <td><code>reddit://$1</code></td>
  </tr>
</table>

</details>

<details>
  <summary><strong>Github: Open Links in App</strong></summary>
  <br>
<table>
  <tr>
    <td><strong>Property</strong></td>
    <td><strong>Value</strong></td>
  </tr>
  <tr>
    <td>Regex</td>
    <td>❌</td>
  </tr>
    <tr>
    <td>In-App Browser</td>
    <td>✅</td>
  </tr>
    <tr>
    <td>From</td>
    <td><code>https://github.com</code></td>
  </tr>
  <tr>
    <td>To</td>
    <td><code>https://github.com</code></td>
  </tr>
</table>

</details>

### TODO
- Allow to organize overrides since they're order based.

# How to install?
Paste the links of the plugins you want into vendetta:
- https://vendetta.nixuge.me/url-overrides
