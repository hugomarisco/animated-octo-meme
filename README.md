# Node.js Fullstack Engineer Challenge

## 1. About you

I was hired by a small startup in London as a Frontend Engineer to build the UI/UX for the CMS of their internal product.

I've used AngularJS 1.x for the Javascript framework and Bootstrap as the foundation for the CSS (extending it a lot to meet the design requirements).

Some of the features of the SPA:

- Authentication + Authorization (role-based authorization)
- Collections' pagination + sorting + filtering (e.g. users/posts/etc)
- Forms to create/update resources with validation as you type
- On demand report builder: data displayed as table + graphs with an import/export function (CSV)

As for the Node.JS part, on my next job at Sky Betting and Gaming, I was part of the data ingestion team - responsible for building services that consumed external data feeds and transformed them to meet the internal schema requirements.

These services were written in Node.JS which was a perfect tool for IO intensive applications.

Each component of our architecture was responsible for a specific task (ingest/transform/notify) and they all communicated using Kafka to handle failures on any component gracefully (messages would remain queued in Kafka to be later processed).

## 2. Document versioning

Since we're dealing with versioned text files, my solution is pretty similar to how Subversion CVS does it.

We store the full text files for the latest version and also reverse diffs for any previous versions.

![Imgur](https://i.imgur.com/Zrk751j.png)

To store this information we can use an ordered array of revisions:

![Imgur](https://i.imgur.com/eOTMPFH.png)

Using a schema like this:

```
[
  {
    "revisionId": <Integer>,
    "diffs": {
      <fileName|String>: [
        "linesRemoved": [<lineNo|Integer>,],
        "linesCreated": [<lineNo|Integer>,]
      ]
    }
  }
]
```

It's importante to notice that we're using lines as the atoms of our diff system.

To improve the performance we can also store full-snapshots every X revisions (so we don't have to apply hundreds or thousands of diff sets to restore an old revision)

## 3. Node.js REST API

[View here](import-export-api)

## 4. AngularJS

[View here](book-list)

## 5. Bonus Question

[View here](op-combination)
