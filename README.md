<img src="https://i.imgur.com/9qYPFSA.png" alt="Alt text" width="40">

### Millennium Community Api:
While this API is publicly available, open-source, and licensed under the permissive MIT license, please refrain from utilizing the live branch for production purposes unless expressly granted permission.
Legal action will be pursued otherwise.

### Documentation:

https://millennium.web.app/api/v2 `GET`

<details>
    <summary>Response Schema</summary>
    
```json
{
    "type": "object",
    "properties": {
        "header_image": {
            "type": "string",
            "default": "[NO-IMAGE]"
        },
        "splash_image": {
            "type": "string",
            "default": "[NO-IMAGE]"
        },
        "tags": {
            "type": "array",
            "default": []
        },
        "download": {
            "type": "string",
            "format": "uri-reference",
            "default": null
        },
        "name": {
            "type": "string",
            "default": "Github.Repo.Name"
        },
        "description": {
            "type": "string",
            "default": "No description. Check back later"
        },
        "version": {
            "type": "string",
            "default": "0"
        },
        "commit_data": {
            "type": "object",
            "properties": {
                "oid": {
                    "type": "string",
                    "example": "01d6b13ff2c3212ac5bc0f646f03105b2d304e47"
                },
                "commitUrl": {
                    "type": "string",
                    "format": "uri",
                    "example": "https://github.com/{owner}/{repo}/commit/{commit-sha}"
                },
                "committedDate": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2024-02-25T01:04:35Z"
                }
            }
        },
        "data": {
            "type": "object",
            "properties": {
                "github": {
                    "type": "object",
                    "properties": {
                        "owner": {
                            "type": "string"
                        },
                        "repo": {
                            "type": "string"
                        }
                    }
                },
                "disabled": {
                    "type": "boolean",
                    "default": false
                },
                "download": {
                    "type": "integer",
                    "example": 100
                },
                "id": {
                    "type": "string",
                    "example": "8YTvx3fAAfwQSu6MNOfH"
                },
                "create_time": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2024-01-15T23:45:29Z"
                }
            }
        }
    }
}
```
</details>

https://millennium.web.app/api/v2/checkupdates `POST`

```json
[
    {
        "owner": "ShadowMonster99",
        "repo": "Simply-Dark"
    }
    ...
]
```

<details>
    <summary>Response Schema</summary>

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "download": {
        "type": "string",
        "format": "uri"
      },
      "name": {
        "type": "string"
      },
      "commit": {
        "type": "string"
      },
      "url": {
        "type": "string",
        "format": "uri"
      },
      "date": {
        "type": "string",
        "format": "date-time"
      },
      "message": {
        "type": "string"
      }
    },
    "required": ["download", "name", "commit", "url", "date", "message"]
  }
}
```
</details>

https://millennium.web.app/api/v2/details/:id `GET`


<details>
    <summary>Response Schema</summary>

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "listing_style": {
      "type": ["string", "null"]
    },
    "header_image": {
      "type": "string",
      "format": "uri"
    },
    "splash_image": {
      "type": "string",
      "format": "uri"
    },
    "read_me": {
      "type": "string"
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "customize": {
      "type": "object",
      "properties": {
        "able": {
          "type": "boolean"
        },
        "length": {
          "type": "integer"
        }
      },
      "required": ["able", "length"]
    },
    "patches": {
      "type": "object",
      "properties": {
        "specific_windows": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "patches_default": {
          "type": "boolean"
        },
        "length": {
          "type": "integer"
        }
      },
      "required": ["specific_windows", "patches_default", "length"]
    },
    "discord": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "icon": {
          "type": "string",
          "format": "uri"
        }
      },
      "required": ["name", "icon"]
    },
    "download": {
      "type": "string",
      "format": "uri"
    },
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "version": {
      "type": "string"
    },
    "commit_data": {
      "type": "object",
      "properties": {
        "oid": {
          "type": "string"
        },
        "commitUrl": {
          "type": "string",
          "format": "uri"
        },
        "committedDate": {
          "type": "string",
          "format": "date-time"
        }
      },
      "required": ["oid", "commitUrl", "committedDate"]
    },
    "data": {
      "type": "object",
      "properties": {
        "github": {
          "type": "object",
          "properties": {
            "repo": {
              "type": "string"
            },
            "owner": {
              "type": "string"
            }
          },
          "required": ["repo", "owner"]
        },
        "download": {
          "type": "integer"
        },
        "id": {
          "type": "string"
        },
        "create_time": {
          "type": "integer"
        }
      },
      "required": ["github", "download", "id", "create_time"]
    }
  }
}
```
</details>

https://millennium.web.app/api/v2/update `POST`

```json
{
    "owner": "ex ShadowMonster99",
    "repo": "ex Simply-Dark"
}
```

<details>
    <summary>Response Schema</summary>

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "success": {
      "type": "boolean"
    },
    "data": {
      "type": "object",
      "properties": {
        "download": {
          "type": "string",
          "format": "uri"
        },
        "rest": {
          "type": "string",
          "format": "uri"
        },
        "latestHash": {
          "type": "string"
        },
        "count": {
          "type": "integer"
        }
      },
      "required": ["download", "rest", "latestHash", "count"]
    }
  },
  "required": ["success", "data"]
}
```
</details>
