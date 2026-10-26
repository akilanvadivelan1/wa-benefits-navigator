# Deploying WA Benefits Navigator to AWS Lightsail (Caddy)

This runbook deploys the app onto an **existing** Lightsail instance named
`risk-radar` (512 MB RAM, 2 vCPU, 20 GB SSD), which already runs **Caddy v2**
on ports 80/443 and reverse-proxies another app (`risks-radar.com`) to a Python
service on `localhost:8080`.

The Benefits Navigator is a **100% static, client-side site** (no server, no
database). We add it as a second Caddy site block. **The existing
`risks-radar.com` app is never touched.**

- **Domain:** `wabenefitsnavigator.org` (+ `www`)
- **Files on server:** `/var/www/wa-benefits/docs`
- **Web server:** Caddy v2.11.4 at `/usr/local/bin/caddy`, config at
  `/etc/caddy/Caddyfile`, managed by systemd (`systemctl reload caddy`).

> Note on routing: the app keeps all navigation in React component state (the
> URL never leaves `/`), so no SPA `try_files` fallback is needed. A browser
> refresh returns the user to the Home screen, which is expected behavior.

---

## Step 1 -- Point DNS at the instance

1. In the Lightsail console, open the `risk-radar` instance and confirm it has
   a **static IP** attached (Networking tab). If not, create and attach one.
   A static IP is important so the address does not change on reboot.
2. At wherever DNS for `wabenefitsnavigator.org` is managed, create these
   records pointing at the static IP:

   | Type | Name  | Value                 |
   |------|-------|-----------------------|
   | A    | `@`   | `<your-static-IP>`    |
   | A    | `www` | `<your-static-IP>`    |

   (If you use the Lightsail DNS zone or Route 53, add the same two A records.)
3. Wait for DNS to propagate. Check with:

   ```bash
   dig +short wabenefitsnavigator.org
   dig +short www.wabenefitsnavigator.org
   ```

   Both must return your static IP before HTTPS can be issued.

---

## Step 2 -- Confirm the Caddy site block

Your `/etc/caddy/Caddyfile` should contain **both** blocks. Compare the
Benefits block against the reference in
[`deploy/Caddyfile.benefits-block`](deploy/Caddyfile.benefits-block). A minimal
working version is:

```caddy
risks-radar.com, www.risks-radar.com {
    reverse_proxy localhost:8080
}

wabenefitsnavigator.org, www.wabenefitsnavigator.org {
    root * /var/www/wa-benefits/docs
    encode gzip
    file_server
}
```

If you want the caching + security headers, copy the fuller version from
`deploy/Caddyfile.benefits-block` into the Benefits block.

After any edit, **validate before reloading** (so a typo can never take down
the running `risks-radar.com` app):

```bash
caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

If `validate` fails, fix the file first. Caddy keeps serving the old config
until a successful reload.

---

## Step 3 -- Deploy the site files

### Option A -- From your laptop (recommended, repeatable)

From the repo root:

```bash
./deploy/deploy.sh ubuntu@wabenefitsnavigator.org
# or, before DNS resolves:
./deploy/deploy.sh ubuntu@<your-static-IP>
```

This rebuilds the app, refreshes `docs/`, and rsyncs it to
`/var/www/wa-benefits/docs`. Use this for every future update too.

### Option B -- Manual, one time

If you prefer to do it by hand, from the repo root on your laptop:

```bash
# Build is already committed in docs/, so you can just copy it up:
ssh ubuntu@<host> "sudo mkdir -p /var/www/wa-benefits/docs && sudo chown -R \$(whoami) /var/www/wa-benefits"
rsync -az --delete docs/ ubuntu@<host>:/var/www/wa-benefits/docs/
```

Make sure Caddy can read the files (it runs as the `caddy` user):

```bash
ssh ubuntu@<host> "sudo chown -R caddy:caddy /var/www/wa-benefits && sudo chmod -R a+rX /var/www/wa-benefits"
```

---

## Step 4 -- Verify

```bash
# From anywhere:
curl -I https://wabenefitsnavigator.org
# Expect: HTTP/2 200, content-type: text/html

curl -I https://wabenefitsnavigator.org/build/web/main.js
# Expect: HTTP/2 200, content-type: application/javascript (or text/javascript)
```

Then open https://wabenefitsnavigator.org in a browser and confirm:

- The language gate appears, then Home loads.
- Start the quiz, complete it, see Results, open a Program Detail, use Browse.
- The padlock shows a valid certificate (Caddy auto-issued it).

> The app loads React from an ESM CDN (esm.sh) via an import map, so the
> visitor's browser needs internet access. The server does not.

---

## Rollback

Because the existing app and this one are independent Caddy blocks:

- **Bad Caddy edit:** `caddy validate` catches it before reload. If a reload
  ever misbehaves, restore the previous Caddyfile and `sudo systemctl reload
  caddy`. The `risks-radar.com` block is unaffected throughout.
- **Bad site deploy:** re-run the deploy with a known-good `docs/`, or remove
  `/var/www/wa-benefits/docs` contents. This never affects `risks-radar.com`.

---

## Future updates

1. Make changes, run `npm run build:web` (or just let `deploy.sh` build).
2. `./deploy/deploy.sh ubuntu@wabenefitsnavigator.org`.
3. Hard-refresh the browser. `index.html` is served with `no-cache`, so new
   builds are picked up immediately; hashed assets are cached for a week.
