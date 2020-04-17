
# Bitcoins direct (client app)


## Run locally
`npm install`
`npm run dev`

## Build for deploy
 `npm run build`

## Deploy

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
> *You have to  [configure aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) at first
`aws_access_key_id=AKIA3YP7UTAQJ4A3DNQ7`
`aws_secret_access_key=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`
`region=eu-west-1` 
`toolkit_artifact_guid=b4152876-c5fc-4671-bab5-4b3bcd7f4cae`


## [Talk.js](https://talkjs.com) integration
Make sure your have an account. The previous config was:

 - App ID: **tL9PLRIs**
 - Roles (bitcoins_direct_user, admin) should have been configured from
   talk.js admin-panel (PM manager credentials, maybe
   kopanenko@magora-systems.com)
