#!/usr/bin/env node
"use strict";var dr=Object.create;var X=Object.defineProperty;var ur=Object.getOwnPropertyDescriptor;var fr=Object.getOwnPropertyNames;var gr=Object.getPrototypeOf,hr=Object.prototype.hasOwnProperty;var m=(e,t)=>()=>(e&&(t=e(e=0)),t);var R=(e,t)=>{for(var r in t)X(e,r,{get:t[r],enumerable:!0})},br=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of fr(t))!hr.call(e,i)&&i!==r&&X(e,i,{get:()=>t[i],enumerable:!(o=ur(t,i))||o.enumerable});return e};var f=(e,t,r)=>(r=e!=null?dr(gr(e)):{},br(t||!e||!e.__esModule?X(r,"default",{value:e,enumerable:!0}):r,e));var v=m(()=>{"use strict"});var ye,s,u=m(()=>{"use strict";ye=require("tslog"),s=new ye.Logger({prettyLogTemplate:"{{logLevelName}}	"})});var ke,Fe,P,k,O,I=m(()=>{"use strict";u();ke=()=>(process.env.OPENAI_API_KEY||s.error("OPENAI_API_KEY is not set"),process.env.OPENAI_API_KEY??""),Fe=()=>(process.env.GITHUB_TOKEN||s.error("GITHUB_TOKEN is not set"),process.env.GITHUB_TOKEN??""),P=()=>{let e=["GITHUB_SHA","BASE_SHA","GITHUB_TOKEN"],t=[];if(e.forEach(r=>process.env[r]??t.push(r)),t.length>0)throw s.error(`Missing environment variables: ${t.join(", ")}`),new Error("One or more GitHub environment variables are not set");return{githubSha:process.env.GITHUB_SHA??"",baseSha:process.env.BASE_SHA??"",githubToken:process.env.GITHUB_TOKEN??""}},k=()=>{let e=["CI_MERGE_REQUEST_DIFF_BASE_SHA","CI_PROJECT_ID","CI_MERGE_REQUEST_IID","CI_COMMIT_SHA","GITLAB_TOKEN"].filter(t=>!process.env[t]);if(e.length>0)throw s.error(`Missing environment variables: ${e.join(", ")}`),new Error("One or more GitLab environment variables are not set. Did you set up your Gitlab access token? Refer to the README (Gitlab CI section) on how to set it up.");return{mergeRequestBaseSha:process.env.CI_MERGE_REQUEST_DIFF_BASE_SHA??"",gitlabSha:process.env.CI_COMMIT_SHA??"",gitlabToken:process.env.GITLAB_TOKEN??"",projectId:process.env.CI_PROJECT_ID??"",mergeRequestIIdString:process.env.CI_MERGE_REQUEST_IID??""}},O=()=>{let e=["SYSTEM_PULLREQUEST_SOURCECOMMITID","BASE_SHA","API_TOKEN"],t=[];if(e.forEach(r=>process.env[r]??t.push(r)),t.length>0)throw s.error(`Missing environment variables: ${t.join(", ")}`),new Error("One or more Azure DevOps environment variables are not set");return{azdevSha:process.env.SYSTEM_PULLREQUEST_SOURCECOMMITID??"",baseSha:process.env.BASE_SHA??"",azdevToken:process.env.API_TOKEN??""}}});var Se,C,Ae=m(()=>{"use strict";Se=require("glob"),C=async e=>{let t=await(0,Se.glob)(e,{nodir:!0});if(t.length===0)throw new Error(`No template file found for pattern: ${e}`);return t[0]}});var xe={};R(xe,{configure:()=>yr});var Te,T,b,E,yr,Ee,vr,Ir,Rr,Oe=m(()=>{"use strict";Te=require("@inquirer/prompts"),T=require("child_process"),b=f(require("fs")),E=f(require("path"));Ae();v();u();yr=async e=>{e.setupTarget==="github"&&await vr(),e.setupTarget==="gitlab"&&await Ir(),e.setupTarget==="azdev"&&await Rr()},Ee=async()=>await(0,Te.password)({message:"Please input your OpenAI API key:"}),vr=async()=>{let e=await C("**/templates/github-pr.yml"),t=E.default.join(process.cwd(),".github","workflows");b.default.mkdirSync(t,{recursive:!0});let r=E.default.join(t,"code-review-gpt.yml");b.default.writeFileSync(r,b.default.readFileSync(e,"utf8"),"utf8"),s.info(`Created GitHub Actions workflow at: ${r}`);let o=await Ee();if(!o){s.error("No API key provided. Please manually add the OPENAI_API_KEY secret to your GitHub repository.");return}try{(0,T.execSync)("gh auth status || gh auth login",{stdio:"inherit"}),(0,T.execSync)(`gh secret set OPENAI_API_KEY --body=${String(o)}`),s.info("Successfully added the OPENAI_API_KEY secret to your GitHub repository.")}catch{s.error("It seems that the GitHub CLI is not installed or there was an error during authentication. Don't forget to add the OPENAI_API_KEY to the repo settings/Environment/Actions/Repository Secrets manually.")}},Ir=async()=>{let e=await C("**/templates/gitlab-pr.yml"),t=process.cwd(),r=E.default.join(t,".gitlab-ci.yml");b.default.writeFileSync(r,b.default.readFileSync(e,"utf8"),"utf8"),s.info(`Created GitLab CI at: ${r}`);let o=await Ee();if(!o){s.error("No API key provided. Please manually add the OPENAI_API_KEY secret to your GitLab CI/CD environment variables for your repository.");return}try{(0,T.execSync)("glab auth login",{stdio:"inherit"}),(0,T.execSync)(`glab variable set OPENAI_API_KEY ${String(o)}`),s.info(`Successfully added the OPENAI_API_KEY secret to your GitLab repository.
 Please make sure you have set up your Gitlab access token before using this tool. Refer to the README (Gitlab CI section) for information on how to do this.`)}catch{s.error("It seems that the GitLab CLI is not installed or there was an error during authentication. Don't forget to add the OPENAI_API_KEY and the GITLAB_TOKEN to the repo's CI/CD Variables manually. Refer to the README (Gitlab CI section)for information on how to set up your access token.")}},Rr=async()=>{let e=await C("**/templates/azdev-pr.yml"),t=process.cwd(),r=E.default.join(t,"code-review-gpt.yaml");b.default.writeFileSync(r,b.default.readFileSync(e,"utf8"),"utf8"),s.info(`Created Azure DevOps Pipeline at: ${r}`),s.info("Please manually add the OPENAI_API_KEY and API_TOKEN secrets as encrypted variables in the UI.")}});var _,Pr,Z,Ce,_e,ee=m(()=>{"use strict";_=require("@actions/github");I();u();Pr=(e,t)=>{let r=e.lastIndexOf(t);return r!==-1?e.slice(r+t.length+1):e},Z=()=>{let{githubToken:e}=P();if(!e)throw new Error("GITHUB_TOKEN is not set");return e},Ce=()=>{let e=Z(),{payload:t,issue:r}=_.context;if(!t.pull_request){s.warn("Not a pull request. Skipping commenting on PR...");return}let o=(0,_.getOctokit)(e),{owner:i,repo:n,number:a}=r;return{octokit:o,owner:i,repo:n,pull_number:a}},_e=async(e,t)=>{try{let r=`${t.feedback.details}

---

${t.signOff}`,{data:o}=await e.rest.pulls.listReviewComments({owner:t.owner,repo:t.repo,pull_number:t.pull_number}),i=Pr(t.feedback.fileName,t.repo),n=o.find(a=>a.path===i&&a.body.includes(t.signOff));n?await e.rest.pulls.updateReviewComment({owner:t.owner,repo:t.repo,comment_id:n.id,body:r}):await e.rest.pulls.createReviewComment({owner:t.owner,repo:t.repo,pull_number:t.pull_number,body:r,commit_id:t.commit_id,path:i,subject_type:"FILE"})}catch(r){s.error(`Failed to comment on PR for feedback: ${t.feedback.details}. Error: ${JSON.stringify(r)}`)}}});var N,$,te=m(()=>{"use strict";N=require("@actions/github");u();ee();$=async(e,t)=>{try{let r=Z(),{payload:o,issue:i}=N.context;if(!o.pull_request){s.warn("Not a pull request. Skipping commenting on PR...");return}let n=(0,N.getOctokit)(r),{owner:a,repo:c,number:l}=i,{data:p}=await n.rest.issues.listComments({owner:a,repo:c,issue_number:l}),d=p.find(g=>g.body?.includes(t)),h=`${e}

---

${t}`;d?await n.rest.issues.updateComment({owner:a,repo:c,comment_id:d.id,body:h}):await n.rest.issues.createComment({owner:a,repo:c,issue_number:l,body:h})}catch(r){throw s.error(`Failed to comment on PR: ${JSON.stringify(r)}`),r}}});var Ne,$e=m(()=>{"use strict";ee();Ne=async(e,t)=>{let r=Ce();if(r){let{octokit:o,owner:i,repo:n,pull_number:a}=r,l=(await o.rest.pulls.get({owner:i,repo:n,pull_number:a})).data.head.sha;for(let p of e)await _e(o,{feedback:p,signOff:t,owner:i,repo:n,pull_number:a,commit_id:l})}}});var Le,L,re=m(()=>{"use strict";Le=require("@gitbeaker/rest");I();u();L=async(e,t)=>{try{let{gitlabToken:r,projectId:o,mergeRequestIIdString:i}=k(),n=parseInt(i,10),a=new Le.Gitlab({token:r}),l=(await a.MergeRequestNotes.all(o,n)).find(d=>d.body.includes(t)),p=`${e}

---

${t}`;l?await a.MergeRequestNotes.edit(o,n,l.id,{body:p}):await a.MergeRequestNotes.create(o,n,p)}catch(r){throw s.error(`Failed to comment on PR: ${JSON.stringify(r)}`),r}}});var M,kr,Me,Ge=m(()=>{"use strict";M=f(require("azure-devops-node-api"));u();kr=()=>{let e=["SYSTEM_TEAMFOUNDATIONCOLLECTIONURI","API_TOKEN","SYSTEM_PULLREQUEST_PULLREQUESTID","BUILD_REPOSITORY_ID","SYSTEM_TEAMPROJECTID"],t=[];if(e.forEach(r=>process.env[r]??t.push(r)),t.length>0)throw s.error(`Missing environment variables: ${t.join(", ")}`),new Error("One or more Azure DevOps environment variables are not set");return{serverUrl:process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI??"",azdevToken:process.env.API_TOKEN??"",pullRequestId:process.env.SYSTEM_PULLREQUEST_PULLREQUESTID??"",project:process.env.SYSTEM_TEAMPROJECTID??"",repositoryId:process.env.BUILD_REPOSITORY_ID??""}},Me=async(e,t)=>{try{let{serverUrl:r,azdevToken:o,pullRequestId:i,repositoryId:n,project:a}=kr(),c=Number(i),l=M.getPersonalAccessTokenHandler(o),d=await new M.WebApi(r,l).getGitApi(),h={comments:[{content:`${e}

---

${t}`}]};await d.createThread(h,n,c,a)}catch(r){throw s.error(`Failed to comment on PR: ${JSON.stringify(r)}`),r}}});var x,oe,ie,G,D,De,Ue,w=m(()=>{"use strict";x="#### Powered by [Code Review GPT](https://github.com/mattzcarey/code-review-gpt)",oe=[{model:"gpt-4-turbo",maxPromptLength:128e3},{model:"gpt-4-turbo-preview",maxPromptLength:128e3},{model:"gpt-4-1106-preview",maxPromptLength:128e3},{model:"gpt-4",maxPromptLength:21e3},{model:"gpt-4-32k",maxPromptLength:9e4},{model:"gpt-3.5-turbo",maxPromptLength:9e3},{model:"gpt-3.5-turbo-16k",maxPromptLength:45e3}],ie={".js":"JavaScript",".ts":"TypeScript",".py":"Python",".sh":"Shell",".go":"Go",".rs":"Rust",".tsx":"TypeScript",".jsx":"JavaScript",".dart":"Dart",".php":"PHP",".cpp":"C++",".h":"C++",".cxx":"C++",".hpp":"C++",".hxx":"C++",".rb":"Ruby",".kt":"Kotlin",".kts":"Kotlin",".java":"Java",".vue":"Vue",".tf":"Terraform",".hcl":"Terraform"},G=new Set(Object.keys(ie)),D=new Set(["types"]),De=3,Ue=5});var U,ne=m(()=>{"use strict";w();U=e=>{let t=oe.find(r=>r.model===e)?.maxPromptLength;if(!t)throw new Error(`Model ${e} not found. Please choose one of ${oe.map(r=>r.model).toString()} or make a PR to add a new model.`);return t}});var Fr,Sr,Ar,Tr,Er,Be,qe=m(()=>{"use strict";Fr=e=>{let t=new RegExp('"details"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"',"g");return e.replace(t,(r,o)=>`"details": "${encodeURIComponent(o)}"`)},Sr=e=>decodeURIComponent(e).replace(/\\n/g,`
`),Ar=e=>e.details=Sr(e.details),Tr=e=>typeof e=="object"&&e!==null&&"fileName"in e&&typeof e.fileName=="string"&&"riskScore"in e&&typeof e.riskScore=="number"&&"details"in e&&typeof e.details=="string",Er=e=>Array.isArray(e)&&e.every(t=>Tr(t)),Be=e=>{let t=e.trim().startsWith("```json")?e.trim().slice(8,-4):e.trim();t=Fr(t);let r=JSON.parse(t);if(Er(r))return r.forEach(o=>{Ar(o)}),r;throw new Error(`The shape of the object returned from the model was incorrect. Object returned was ${String(r)}. Object should include fileName, riskScore and details fields.`)}});var je,ze,xr,se,B,ae=m(()=>{"use strict";je=require("langchain/llms/openai"),ze=require("ts-retry");u();qe();xr=3,se=class{constructor(t){switch(t.provider){case"openai":this.model=new je.OpenAIChat({openAIApiKey:t.apiKey,modelName:t.modelName,temperature:t.temperature,configuration:{organization:t.organization}});break;case"bedrock":throw new Error("Bedrock provider not implemented");default:throw new Error("Provider not supported")}this.retryCount=t.retryCount||xr}async callModel(t){return this.model.call(t)}async callModelJSON(t){return(0,ze.retryAsync)(async()=>{let r=await this.callModel(t);s.debug(`Model response: ${r}`);try{return Be(r)}catch(o){throw s.error(`Error parsing JSON response from the model: ${r}`,o),o}},{maxTry:this.retryCount,onError:r=>{s.error("Error in callModelJSON",r)},onMaxRetryFunc:()=>{throw new Error(`Couldn't call model after ${this.retryCount} tries with prompt: ${t}`)}})}},B=se});var me,He,Ke=m(()=>{"use strict";me=class{constructor(t=[]){this.items=t}enqueue(t,r){let o={priority:r,item:t};this.items.push(o),this.items.sort((i,n)=>i.priority-n.priority)}dequeue(){return this.items.shift()?.item}size(){return this.items.length}peek(){return this.items[0]}getItems(){return this.items.map(t=>t.item)}},He=me});var Or,ce,Ye,le=m(()=>{"use strict";Or=e=>`
**Risk Level ${e.riskScore} - ${e.fileName}**

${e.details}

`,ce=e=>`
${e.map(Or).join(`
---
`)}
`,Ye=(e,t)=>`
${ce(e)}
---
${t}

`});var pe,Ve,de=m(()=>{"use strict";pe=`You are an expert {Language} developer, your task is to review a set of pull requests.
You are given a list of filenames and their partial contents, but note that you might not have the full context of the code.

Only review lines of code which have been changed (added or removed) in the pull request. The code looks similar to the output of a git diff command. Lines which have been removed are prefixed with a minus (-) and lines which have been added are prefixed with a plus (+). Other lines are added to provide context but should be ignored in the review.

Begin your review by evaluating the changed code using a risk score similar to a LOGAF score but measured from 1 to 5, where 1 is the lowest risk to the code base if the code is merged and 5 is the highest risk which would likely break something or be unsafe.

In your feedback, focus on highlighting potential bugs, improving readability if it is a problem, making code cleaner, and maximising the performance of the programming language. Flag any API keys or secrets present in the code in plain text immediately as highest risk. Rate the changes based on SOLID principles if applicable.

Do not comment on breaking functions down into smaller, more manageable functions unless it is a huge problem. Also be aware that there will be libraries and techniques used which you are not familiar with, so do not comment on those unless you are confident that there is a problem.

Use markdown formatting for the feedback details. Also do not include the filename or risk level in the feedback details.

Ensure the feedback details are brief, concise, accurate. If there are multiple similar issues, only comment on the most critical.

Include brief example code snippets in the feedback details for your suggested changes when you're confident your suggestions are improvements. Use the same programming language as the file under review.
If there are multiple improvements you suggest in the feedback details, use an ordered list to indicate the priority of the changes.

Format the response in a valid JSON format as a list of feedbacks, where the value is an object containing the filename ("fileName"),  risk score ("riskScore") and the feedback ("details"). The schema of the JSON feedback object must be:
{
  "fileName": {
    "type": "string"
  },
  "riskScore": {
    "type": "number"
  },
  "details": {
    "type": "string"
  }
}

The filenames and file contents to review are provided below as a list of JSON objects:

`,Ve=`
You are a senior developer and have just reviewed a pull request. This was your feedback:
{feedback}
Please summarise the review using 3 emojis.
`});var Cr,Je,_r,Nr,We,Qe=m(()=>{"use strict";Ke();le();u();w();de();Cr=async e=>{try{return await e}catch(t){throw s.error("Error in processing prompt",t),t}},Je=async(e,t)=>{let r=Ve.replace("{feedback}",JSON.stringify(t)),o=await e.callModel(r);return s.info(o),o},_r=(e,t)=>{let r=new He;return e.filter(i=>i.riskScore>1).forEach(i=>{r.enqueue(i,i.riskScore+Math.random()),r.size()>t&&r.dequeue()}),r.getItems()},Nr=e=>e.reduce((t,r)=>(r.status==="fulfilled"&&t.push(...r.value),t),[]),We=async(e,t)=>{let r=t.map(a=>e.callModelJSON(a)),o=await Promise.allSettled(r.map(Cr)),i=Nr(o),n=_r(i,De);return s.info(ce(n)),n}});var q,ue=m(()=>{"use strict";ae();u();Qe();le();q=async(e,t,r,o,i)=>{s.info("Asking the experts...");let n=new B({modelName:t,temperature:0,apiKey:r,organization:o,provider:i}),a=await We(n,e);s.debug(`Feedback received:
 ${a.map(l=>`Filename: ${l.fileName}, RiskScore: ${l.riskScore}, Details: ${l.details}
`).toString()}`);let c=await Je(n,a);return s.debug(`Summary of feedbacks: ${c}`),{markdownReport:Ye(a,c),feedbacks:a}}});var $r,Lr,Mr,Gr,j,fe=m(()=>{"use strict";$r=(e,t)=>{let r={},o=0,i=1/0,n=-1/0,a=new Map;return e.forEach((c,l)=>{let p=c.trim(),d=a.get(p)||[];d.push(l),a.set(p,d)}),t.forEach(c=>{let l=c.substring(1).trim(),p=a.get(l);if(p&&p.length>0){let d=p.shift();r[d]=c,o+=c.length+1,i=Math.min(i,d),n=Math.max(n,d)}}),{changedIndices:r,totalChangedLinesLength:o,minIndex:i,maxIndex:n}},Lr=(e,t,r,o)=>{let i=Math.max(e-(o||0),0),n=Math.min(t+(o||0),r-1);return{start:i,end:n}},Mr=(e,t,r,o)=>{let i=!0,n=!0;for(;o>0&&(i||n);){if(i&&e>0){let a=r[e-1].length+1;a<=o?(e--,o-=a):i=!1}if(n&&t<r.length-1){let a=r[t+1].length+1;a<=o?(t++,o-=a):n=!1}if((e===0||!i)&&(t===r.length-1||!n))break;e===0&&(i=!1),t===r.length-1&&(n=!1)}return{start:e,end:t}},Gr=(e,t,r,o)=>{let i=e>0?`...
`:"";for(let n=e;n<=t;n++)i+=(r[n]||o[n])+`
`;return t<o.length-1&&(i+=`...
`),i.trim()},j=(e,t,r)=>e.reduce((o,i)=>{let n=i.fileContent.split(`
`),a=i.changedLines.split(`
`),{changedIndices:c,totalChangedLinesLength:l,minIndex:p,maxIndex:d}=$r(n,a);if(l===0)return o;let h=t-l-i.fileName.length,{start:g,end:S}=Lr(p,d,n.length,r);r||({start:g,end:S}=Mr(g,S,n,h));let Q=Gr(g,S,c,n);return o.push({fileName:i.fileName,promptContent:Q}),o},[])});var Xe,Ze=m(()=>{"use strict";Xe=e=>e.fileName.length+e.promptContent.length});var F,z=m(()=>{"use strict";u();Ze();F=(e,t)=>{let r=[],o=[],i=0;for(let n of e){let a=Xe(n);if(a>t){s.error(`Changes to file ${n.fileName} are larger than the max prompt length, consider using a model with a larger context window. Skipping file changes...`);continue}else i+a>t?(r.push(o),o=[n],i=a):(o.push(n),i+=a)}return o.length>0&&r.push(o),r}});var et,tt=m(()=>{"use strict";fe();z();et=(e,t)=>{let r=j(e,t);return F(r,t)}});var rt,ot=m(()=>{"use strict";fe();z();w();rt=(e,t)=>{let r=j(e,t,Ue);return F(r,t)}});var it,nt=m(()=>{"use strict";z();it=(e,t)=>{let r=e.map(o=>({fileName:o.fileName,promptContent:o.fileContent.split(`
`).map(i=>`+${i}`).join(`
`)}));return F(r,t)}});var st,at,mt=m(()=>{"use strict";st=require("path");w();at=e=>{let t=(0,st.extname)(e);return ie[t]||"Unknown Language"}});var H,ge=m(()=>{"use strict";tt();ot();nt();mt();de();H=(e,t,r)=>{let o=t-pe.length,i;switch(r){case"full":i=it(e,o);break;case"changed":i=et(e,o);break;case"costOptimized":i=rt(e,o);break;default:throw new Error(`Review type ${r} is not supported. Please use one of the following: full, changed, costOptimized.`)}let n=pe.replace("{Language}",at(e[0].fileName));return i.map(c=>n+JSON.stringify(c))}});var ct,he,lt=m(()=>{"use strict";ct=require("path");w();he=e=>e.filter(r=>{let o=(0,ct.extname)(r.fileName);return G.has(o)&&![...D].some(i=>r.fileName.includes(i))&&r.changedLines.trim()!==""})});var pt=m(()=>{"use strict";lt()});var dt={};R(dt,{review:()=>Dr});var Dr,ut=m(()=>{"use strict";te();$e();re();Ge();ne();v();u();w();ue();ge();pt();Dr=async(e,t,r)=>{s.debug("Review started."),s.debug(`Model used: ${e.model}`),s.debug(`Ci enabled: ${e.ci??"ci is undefined"}`),s.debug(`Comment per file enabled: ${String(e.commentPerFile)}`),s.debug(`Review type chosen: ${e.reviewType}`),s.debug(`Organization chosen: ${e.org??"organization is undefined"}`),s.debug(`Remote Pull Request: ${e.remote??"remote pull request is undefined"}`);let o=e.ci,i=e.commentPerFile,n=e.model,a=e.reviewType,c=e.org,l=e.provider,p=he(t);if(p.length===0){s.info("No file to review, finishing review now.");return}s.debug(`Files to review after filtering: ${p.map(Q=>Q.fileName).toString()}`);let d=U(n),h=H(p,d,a);s.debug(`Prompts used:
 ${h.toString()}`);let{markdownReport:g,feedbacks:S}=await q(h,n,r,c,l);return s.debug(`Markdown report:
 ${g}`),o==="github"&&(i||await $(g,x),i&&await Ne(S,x)),o==="gitlab"&&await L(g,x),o==="azdev"&&await Me(g,x),g}});var ft,Ur,Br,qr,gt,ht=m(()=>{"use strict";ft=require("path");w();Ur=["removed","unchanged"],Br=e=>!Ur.includes(e),qr=e=>{let t=(0,ft.extname)(e);return G.has(t)&&![...D].some(r=>e.includes(r))},gt=(e,t)=>Br(t)&&qr(e)});var bt,jr,K,wt=m(()=>{"use strict";bt=require("octokit");ht();I();jr=e=>typeof e=="object"&&e!==null&&"data"in e&&typeof e.data=="object"&&e.data!==null&&"content"in e.data&&typeof e.data.content=="string",K=class{constructor(){this.client=new bt.Octokit({auth:Fe()})}async fetchReviewFiles(t){let r=await this.client.paginate(this.client.rest.pulls.listFiles,{owner:t.owner,repo:t.repo,pull_number:t.prNumber});return await this.fetchPullRequestFiles(r)}async fetchPullRequestFiles(t){let r=[];for(let o of t){if(!gt(o.filename,o.status))continue;let i=await this.fetchPullRequestFile(o);r.push(i)}return r}async fetchPullRequestFile(t){let r=await this.fetchPullRequestFileContent(t.contents_url);return{fileName:t.filename,fileContent:r,changedLines:t.patch??""}}async fetchPullRequestFileContent(t){let r=await this.client.request(`GET ${t}`);if(jr(r))return this.decodeBase64(r.data.content);throw new Error(`Unexpected response from Octokit. Response was ${JSON.stringify(r)}.`)}decodeBase64(t){return Buffer.from(t,"base64").toString("utf-8")}}});var yt,vt=m(()=>{"use strict";yt=e=>{let[t,r,o,i,n]=e.split(/(\/|#)/),a=parseInt(n);return{owner:t,repo:o,prNumber:a}}});var It={};R(It,{getRemotePullRequestFiles:()=>zr});var zr,Rt=m(()=>{"use strict";wt();vt();zr=async e=>{let t=yt(e),r=new K;try{return await r.fetchReviewFiles(t)}catch(o){throw new Error(`Failed to get remote Pull Request files: ${JSON.stringify(o)}`)}}});var Pt,Hr,kt,Ft=m(()=>{"use strict";Pt=require("child_process");I();v();Hr=(e,t)=>{if(e==="github"){let{githubSha:r,baseSha:o}=P();return`git diff -U0 --diff-filter=AMRT ${o} ${r} ${t}`}else if(e==="gitlab"){let{gitlabSha:r,mergeRequestBaseSha:o}=k();return`git diff -U0 --diff-filter=AMRT ${o} ${r} ${t}`}else if(e==="azdev"){let{azdevSha:r,baseSha:o}=O();return`git diff -U0 --diff-filter=AMRT ${o} ${r} ${t}`}return`git diff -U0 --diff-filter=AMRT --cached ${t}`},kt=async(e,t)=>{let r=Hr(e,t);return new Promise((o,i)=>{(0,Pt.exec)(r,(n,a,c)=>{if(n)i(new Error(`Failed to execute command. Error: ${n.message}`));else if(c)i(new Error(`Command execution error: ${c}`));else{let l=a.split(`
`).filter(p=>p.startsWith("+")||p.startsWith("-")).filter(p=>!p.startsWith("---")&&!p.startsWith("+++")).join(`
`);o(l)}})})}});var be,St,Kr,Yr,At,Tt=m(()=>{"use strict";be=require("child_process"),St=require("path");I();v();Kr=e=>{if(e==="github"){let{githubSha:t,baseSha:r}=P();return`git diff --name-only --diff-filter=AMRT ${r} ${t}`}else if(e==="gitlab"){let{gitlabSha:t,mergeRequestBaseSha:r}=k();return`git diff --name-only --diff-filter=AMRT ${r} ${t}`}else if(e==="azdev"){let{azdevSha:t,baseSha:r}=O();return`git diff --name-only --diff-filter=AMRT ${r} ${t}`}return"git diff --name-only --diff-filter=AMRT --cached"},Yr=()=>new Promise((e,t)=>{(0,be.exec)("git rev-parse --show-toplevel",(r,o)=>{r?t(new Error(`Failed to find git root. Error: ${r.message}`)):e(o.trim())})}),At=async e=>{let t=await Yr(),r=Kr(e);return new Promise((o,i)=>{(0,be.exec)(r,{cwd:t},(n,a,c)=>{if(n)i(new Error(`Failed to execute command. Error: ${n.message}`));else if(c)i(new Error(`Command execution error: ${c}`));else{let l=a.split(`
`).filter(p=>p.trim()!=="").map(p=>(0,St.join)(t,p.trim()));o(l)}})})}});var Ot={};R(Ot,{getFilesWithChanges:()=>Vr});var Et,xt,Vr,Ct=m(()=>{"use strict";Et=require("fs/promises"),xt=require("process");Ft();Tt();u();Vr=async e=>{try{let t=await At(e);return t.length===0&&(s.warn("No files with changes found, you might need to stage your changes."),(0,xt.exit)(0)),await Promise.all(t.map(async o=>{let i=await(0,Et.readFile)(o,"utf8"),n=await kt(e,o);return{fileName:o,fileContent:i,changedLines:n}}))}catch(t){throw new Error(`Failed to get files with changes: ${JSON.stringify(t)}`)}}});var _t={};R(_t,{getReviewFiles:()=>Jr});var Jr,Nt=m(()=>{"use strict";Jr=async(e,t)=>{if(t!==void 0){let{getRemotePullRequestFiles:r}=await Promise.resolve().then(()=>(Rt(),It));return await r(t)}else{let{getFilesWithChanges:r}=await Promise.resolve().then(()=>(Ct(),Ot));return await r(e)}}});var $t,we,Y=m(()=>{"use strict";$t=`
Your role is to help testing a GPT application reviewing code changes. You receive a test case and you need to generate code in typescript corresponding to this test case, even if it follows bad practices or has security issues.
The test cases is formatted as a stringified JSON object with the following properties:
- name: the name of the test case
- description: the description of the test case

The input is the following:
{testCase}

Return the content of a valid typescript file that would pass the test case.
`,we="#### Tests Powered by [Code Review GPT](https://github.com/mattzcarey/code-review-gpt)"});var Lt,Mt,Gt,Dt=m(()=>{"use strict";Lt=require("langchain/embeddings/openai"),Mt=require("langchain/vectorstores/memory"),Gt=async e=>{let t=new Lt.OpenAIEmbeddings;return await Mt.MemoryVectorStore.fromDocuments(e,t,{})}});var Ut,Bt,qt,Wr,jt,zt=m(()=>{"use strict";Ut=require("fs"),Bt=require("langchain/document_loaders/fs/text"),qt=f(require("path"));Dt();Wr=async e=>await new Bt.TextLoader(e).load(),jt=async e=>{let t=(0,Ut.readdirSync)(e),r=await Promise.all(t.map(async o=>Wr(qt.default.join(e,o))));return await Gt(r.flat())}});var V,Ht,Qr,Xr,Kt,Yt=m(()=>{"use strict";V=require("fs/promises"),Ht=f(require("path"));u();Qr=e=>typeof e=="object"&&e!==null&&"name"in e&&typeof e.name=="string"&&"description"in e&&typeof e.description=="string",Xr=async e=>{try{let t=await(0,V.readFile)(e,"utf8"),r=JSON.parse(t);if(!Qr(r))throw new Error("File data is of unexpected format.");return r}catch(t){throw s.error(`Error loading test case: ${e}`),t}},Kt=async e=>{try{let t=(await(0,V.readdir)(e)).filter(r=>r.endsWith(".json"));return Promise.all(t.map(async r=>await Xr(Ht.default.join(e,r))))}catch(t){throw s.error(`Error loading test cases from: ${e}`),t}}});var Vt,Zr,Jt,Wt=m(()=>{"use strict";Vt=f(require("crypto")),Zr="sha256",Jt=e=>Vt.default.createHash(Zr).update(e).digest("hex")});var J,Qt,eo,to,Xt,Zt=m(()=>{"use strict";J=require("fs"),Qt=f(require("path"));Wt();u();Y();eo=async(e,t)=>{let r=$t.replace("{testCase}",JSON.stringify(e));return(await t.callModel(r)).replace("```typescript","").replace("```","")},to=async(e,t,r)=>{if(e.snippet)return e;let o=Jt(e.description),i=Qt.default.join(t,`${o}.ts`);try{let n=(0,J.readFileSync)(i,"utf8");return{...e,snippet:{fileName:i,fileContent:n,changedLines:n}}}catch{s.info(`Snippet not found in cache: ${e.name}. Generating it...`);let a=await eo(e,r);return(0,J.writeFileSync)(i,a,"utf8"),{...e,snippet:{fileName:i,fileContent:a,changedLines:a}}}},Xt=async(e,t,r)=>Promise.all(e.map(o=>to(o,t,r)))});var y,tr,ro,rr,or,oo,ir,nr=m(()=>{"use strict";y=f(require("chalk"));Y();tr=(o=>(o.PASS="PASS",o.WARN="WARN",o.FAIL="FAIL",o))(tr||{}),ro=e=>e>1-.1?"PASS":e>1-2*.1?"WARN":"FAIL",rr=(e,t)=>{switch(e){case"PASS":return y.default.green(`\u2705 [PASS] - ${t}`);case"WARN":return y.default.yellow(`\u26A0\uFE0F [WARN] - ${t}`);case"FAIL":return y.default.red(`\u274C [FAIL] - ${t}`)}},or=(e,t,r,o)=>{let i=ro(o),n=i!=="PASS",a=rr(i,`Test case: ${e.name} - Similarity score: ${o}
`)+(n?oo(e,t,r):"");return{result:i,report:a}},oo=(e,t,r)=>`
 > Test case snippet: ${JSON.stringify(e.snippet)}

===============================================================================

 > Review:
${t}
===============================================================================

> Similar review:
${r}

`,ir=e=>{let t=Object.entries(e).reduce((o,[i,n])=>o+rr(n,`Test case: ${i}`)+`
`,y.default.blue(`
### Test results summary:
`)),r=Object.values(e).reduce((o,i)=>(o[i]++,o),Object.fromEntries(Object.values(tr).map(o=>[o,0])));return t+`
**SUMMARY: ${y.default.green(`\u2705 PASS: ${r.PASS}`)} - ${y.default.yellow(`\u26A0\uFE0F WARN: ${r.WARN}`)} - ${y.default.red(`\u274C FAIL: ${r.FAIL}`)}**
`}});var sr,io,ar,mr=m(()=>{"use strict";sr=f(require("chalk"));u();ue();ge();nr();io=async(e,t,r,o,i,n)=>{if(!e.snippet)throw new Error(`Test case ${e.name} does not have a snippet.`);s.info(sr.default.blue(`Running test case ${e.name}...`));let a=H([e.snippet],r,i),{markdownReport:c}=await q(a,t,n,void 0,"openai"),l=await o.similaritySearchWithScore(c,1);if(l.length===0)throw new Error(`No similar reviews found for test case ${e.name}.`);let[p,d]=l[0],{result:h,report:g}=or(e,c,p.pageContent,d);return s.info(g),h},ar=async(e,t,r,o,i,n)=>{if(e.length===0)return"No test cases found.";s.info(`Running ${e.length} test cases...
`);let a={};for(let l of e)try{let p=await io(l,t,r,o,i,n);a[l.name]=p}catch(p){s.error(`Error running test case ${l.name}:`,p)}let c=ir(a);return s.info(c),c}});var cr={};R(cr,{test:()=>no});var W,no,lr=m(()=>{"use strict";W=f(require("path"));te();re();ae();ne();v();Y();zt();Yt();Zt();mr();no=async({ci:e,model:t,reviewType:r},o)=>{let i=U(t),n=await Kt(W.default.join(__dirname,"cases")),a=await Xt(n,W.default.join(__dirname,"cases/.cache"),new B({modelName:t,temperature:0,apiKey:o,organization:void 0,provider:"openai"})),c=await jt(W.default.join(__dirname,"cases/snapshots")),l=await ar(a,t,i,c,r,o);e==="github"&&await $(l,we),e==="gitlab"&&await L(l,we)}});var pr=f(require("dotenv"));var ve=f(require("@inquirer/rawlist")),Ie=f(require("dotenv")),Re=f(require("yargs"));v();u();Ie.default.config();var wr=async()=>await(0,ve.default)({message:"What do you want to do?",choices:[{name:"Review staged files",value:"review"},{name:"Configure the script for CI (Recommended for first time use)",value:"configure"}]}),Pe=async()=>{let e=Re.default.option("ci",{description:"Indicates that the script is running on a CI environment. Specifies which platform the script is running on, 'github', 'azdev' or 'gitlab'. Defaults to 'github'.",choices:["github","gitlab","azdev"],type:"string",coerce:t=>t||"github"}).option("setupTarget",{description:"Specifies for which platform ('github', 'gitlab' or 'azdev') the project should be configured for. Defaults to 'github'.",choices:["github","gitlab","azdev"],type:"string",default:"github"}).option("commentPerFile",{description:"Enables feedback to be made on a file-by-file basis. Only work when the script is running on GitHub.",type:"boolean",default:!1}).option("model",{description:"The model to use for generating the review.",type:"string",default:"gpt-4"}).option("reviewType",{description:"Type of review to perform. 'full' will review the entire file, 'changed' will review the changed lines only but provide the full file as context if possible. 'costOptimized' will review only the changed lines using the least tokens possible to keep api costs low. Defaults to 'changed'.",choices:["full","changed","costOptimized"],type:"string",default:"changed"}).option("remote",{description:"The identifier of a remote Pull Request to review",type:"string",coerce:t=>t||""}).option("debug",{description:"Enables debug logging.",type:"boolean",default:!1}).option("org",{description:"Organization id to use for openAI",type:"string",default:void 0}).option("provider",{description:"Provider to use for AI",choices:["openai","bedrock"],type:"string",default:"openai"}).command("review","Review the pull request.").command("configure","Configure the script.").parseSync();if(e._[0]||(e._[0]=await wr()),e.shouldCommentPerFile&&!e.isCi)throw new Error("The 'commentPerFile' flag requires the 'ci' flag to be set.");return e.isCi==="gitlab"&&e.shouldCommentPerFile&&s.warn("The 'commentPerFile' flag only works for GitHub, not for GitLab and AzureDevOps."),e};u();I();pr.default.config();var so=async()=>{let e=await Pe(),t=ke();switch(s.settings.minLevel=e.debug?2:e.ci?4:3,s.debug(`Args: ${JSON.stringify(e)}`),e._[0]){case"configure":{let{configure:r}=await Promise.resolve().then(()=>(Oe(),xe));await r(e);break}case"review":{let{review:r}=await Promise.resolve().then(()=>(ut(),dt)),{getReviewFiles:o}=await Promise.resolve().then(()=>(Nt(),_t)),i=await o(e.ci,e.remote);await r(e,i,t);break}case"test":{let{test:r}=await Promise.resolve().then(()=>(lr(),cr));await r(e,t);break}default:s.error("Unknown command"),process.exit(1)}};so().catch(e=>{let t=e instanceof Error?e.message:"An unknown error occurred",r=e instanceof Error?e.stack:"No stack trace available";s.error(`Error: ${t}`),r&&s.debug(`Stack trace: ${r}`),process.exit(1)});
