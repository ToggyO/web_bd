
# Ides Trading (client app)


## Run locally
`npm install`

`npm run dev`

## Build for deploy
 `npm run build`

##Deploy
Connect to remote server via SSH:
1. Download private key .pem from https://confluence.magora.team/display/BTCD/Server+Credentials;

2. Enter the directory, which contains .pem file and run `chmod 400 {private_key_file_name}.pem`;

3. Connect to your instance using its Public DNS or Public IPv4 address:
- Public DNS: `ec2-18-193-89-65.eu-central-1.compute.amazonaws.com`;
- Public IPv4 address: `18.193.89.65`.
  *Example `ssh -i "{private_key_file_name}.pem" ubuntu@ec2-18-193-89-65.eu-central-1.compute.amazonaws.com`

4. Run `cd web_bd` or clone project from [repository](https://bitbucket.org/mgrsys/web_bd/src/master/);

5. Change branch to `staging` by executing `git checkout staging`;

6. Run `docker-compose up -d --build`;

7. Check your app in browser on `ec2-18-193-89-65.eu-central-1.compute.amazonaws.com` or `18.193.89.65`.

## Deploy (LEGACY 28.09.220)

There are two ways to deploy:

**via [AWS console GUI](https://console.aws.amazon.com/)** 

1. Use this credentials (owner danilov):
- Account Id: 808526845984 
- User: ponomarev@magora-systems.com
- password: zoknep-jebvi3-Miknif
  
2. Choose [Cloudfront](https://console.aws.amazon.com/cloudfront/home?region=eu-west-1#distributions:)
  
3. Select distribution id **E1LW156P4FUL1P**
   
4. Invalidations -> Create invalidation - Object path should be `/` (or you can check previous invalidation details)
   
5. Wait until it completes
   
6. Go to [S3 Storages](https://s3.console.aws.amazon.com/s3/home?region=eu-west-1) - you will see a bunch of buckets - select `s.bitcoinsdirect.com`
   
7. Select all files -> Actions -> Delete
   
8. Drag and drop your build folder

**via [AWS-cli*](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html)**

1. Remove all files in s3 bucket: ```aws s3 rm s3://s.bitcoinsdirect.com --recursive```
   
2. Invalidate container: ```aws cloudfront create-invalidation --distribution-id E1LW156P4FUL1P --paths /```
   
3. Now you have to wait until invalidation completes. You can check status ```aws cloudfront get-invalidation --distribution-id E1LW156P4FUL1P --id _VALIDATION_ID_```
   
4. Copy files to bucket: ```aws s3 cp build s3://s.bitcoinsdirect.com --recursive```
   
 *You have to  [configure aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) at first

```aws_access_key_id=AKIA3YP7UTAQJ4A3DNQ7```

```aws_secret_access_key=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```

```region=eu-west-1```

```toolkit_artifact_guid=b4152876-c5fc-4671-bab5-4b3bcd7f4cae```


## [Talk.js](https://talkjs.com) integration
Make sure your have an account. The previous config was:

- App ID: **tL9PLRIs**
  
- Roles (bitcoins_direct_user, admin) should have been configured from talk.js admin-panel (PM manager credentials, maybe kopanenko@magora-systems.com)
