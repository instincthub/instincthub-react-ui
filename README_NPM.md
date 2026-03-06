## Configure it in your ~/.npmrc 
This doesn't require password each time you need to deploy.

```bash
npm config set //registry.npmjs.org/:_authToken=YOUR_AUTOMATION_TOKEN
```
                                                                                                                            
This writes to ~/.npmrc and persists across sessions. With an automation token, npm publish will never prompt for OTP.  
Verify 

```bash
npm whoami
```
Should show your username without any prompt.    


## Deploy public
```bash
pnpm rollup
npm publish --access public
```
