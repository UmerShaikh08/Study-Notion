#!/usr/bin/env node
const cdk = require("aws-cdk-lib");
const { AppStack } = require("../lib/app-stack");

const STACK_ID = process.env.STACK_ID;
const DEPLOYMENT_ENV = process.env.DEPLOYMENT_ENV;
const REGION = process.env.REGION;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;

const STACK_NAME = `${DEPLOYMENT_ENV}-${STACK_ID}-frontend-stack`;

const app = new cdk.App();
new AppStack(app, STACK_NAME, {
    env: { account: process.env.ACCOUNT_ID, region: process.env.AWS_REGION },
    DEPLOYMENT_ENV,
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    REGION,
    STACK_ID,
});
