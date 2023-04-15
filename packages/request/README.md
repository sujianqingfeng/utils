# request

```
ni @sujian/request
```

如果使用ts, AxiosRequestConfig 没有自定义配置提示，可以在tsconfig.json中添加types

```json
{
  "compilerOptions": {
    "types": ["@sujian/request/types"]
  }
}
```

如果使用了pnpm包管理，不能直接使用axios，这个是正常的，如果想要使用，两种方案：

1. 显式安装axios
2. 在**.npmrc**文件中添加
  ```
  # 依赖提升
  public-hoist-pattern[]=axios
  ```