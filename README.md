# The New Toolchain Installation Method
```
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
```

### Subcommands
- compact check
- compact update
- compact update 0.23.0
- compact list
- compact list --installed
- compact compile <contract file> <output directory>
- compact compile +0.23.0 <contract file> <output directory>
- compact clean
- compact self check
- compact --help


# command to find all files larger than 100MB in your repository

```
find . -type f -size +100M -not -path "*/node_modules/*" -exec ls -lh {} \;
```
