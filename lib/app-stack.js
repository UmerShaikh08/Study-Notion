const { Stack, aws_cloudfront, aws_s3, aws_s3_deployment, aws_iam, CfnOutput } = require("aws-cdk-lib");
const path = require("path");
const AWS = require("aws-sdk");

class AppStack extends Stack {
    constructor(scope, id, props) {
        const DEPLOYMENT_ENV = props.DEPLOYMENT_ENV;
        const STACK_ID = props.STACK_ID;

        super(scope, id, props);

        const bucketName = `${DEPLOYMENT_ENV}-${STACK_ID}-frontend`;
        const bucket = new aws_s3.Bucket(this, bucketName, {
            bucketName,
        });

        // Create an Origin Access Identity (OAI) for CloudFront
        const oai = new aws_cloudfront.OriginAccessIdentity(this, `${DEPLOYMENT_ENV}-${STACK_ID}-oai`);

        // Update the S3 bucket policy to allow access from CloudFront using the OAI
        bucket.addToResourcePolicy(
            new aws_iam.PolicyStatement({
                actions: ["s3:GetObject"],
                effect: aws_iam.Effect.ALLOW,
                principals: [oai.grantPrincipal],
                resources: [bucket.arnForObjects("*")],
            })
        );

        // Deploy files from local directory to S3 bucket
        new aws_s3_deployment.BucketDeployment(this, `${DEPLOYMENT_ENV}-${STACK_ID}-deploy-frontend`, {
            sources: [aws_s3_deployment.Source.asset(path.join(__dirname, "../lib/frontend/build"))],
            destinationBucket: bucket,
        });

        // Create CloudFront distribution
        const distributionName = `${DEPLOYMENT_ENV}-${STACK_ID}-cloudfront-distribution`;
        const distribution = new aws_cloudfront.CloudFrontWebDistribution(this, distributionName, {
            defaultRootObject: "index.html",
            comment: distributionName,
            httpVersion: aws_cloudfront.HttpVersion.HTTP2_3,
            errorConfigurations: [
                {
                    errorCode: 403,
                    responsePagePath: "/index.html",
                    responseCode: 200,
                },
                {
                    errorCode: 404,
                    responsePagePath: "/index.html",
                    responseCode: 200,
                },
            ],
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: bucket,
                        originAccessIdentity: oai,
                    },
                    behaviors: [{ isDefaultBehavior: true }],
                },
            ],
        });

        // Construct URL from CloudFront distribution domain name
        const distributionUrl = `https://${distribution.distributionDomainName}`;

        // Expose CloudFront distribution domain name as an output in URL format
        new CfnOutput(this, `${DEPLOYMENT_ENV}-cloudfront-distribution-domain-url`, {
            value: distributionUrl.toString(),
            description: `${DEPLOYMENT_ENV}-cloudfront-distribution-domain-url`,
        });

        // Expose CloudFront distribution domain name as an output in URL format
        new CfnOutput(this, `${DEPLOYMENT_ENV}-cloudfront-distribution-id`, {
            value: distribution.distributionId,
            description: `${DEPLOYMENT_ENV}-cloudfront-distribution-domain-id`,
        });
    }
}

module.exports = { AppStack };
