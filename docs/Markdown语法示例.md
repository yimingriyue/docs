

以下是一些基本的 Markdown 语法示例，样式效果。

## 标题

在文本前添加井号 `#` 与空格，即可创建标题。井号数量对应标题等级。

### 语法

```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

### 效果

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

## 段落

使用空行分隔文本，即可创建段落。

##  折叠语法

```markdown
<details>
  <summary>点我展开</summary>
  Markdown默认折叠语法
</details>
```
### 效果
<details>
  <summary>点我展开</summary>
  Markdown默认折叠语法，Vitepress可以使用容器折叠语法，更加美观
</details>

## 图片

使用感叹号 `!` 方括号 `[]` 与圆括号 `()`，即可添加图片。这些符号都是英文半角符号，而非中文全角符号。

### 语法

```markdown
![图片描述](https://streamshare.wireway.ch/download/r3obhdqk)
```

### 效果

![图片描述](https://streamshare.wireway.ch/download/r3obhdqk)

## 块引用

在段落前添加 `>` 符号和空格，即可创建块引用。在段落间的空行添加 `>` 符号，即可包含多个段落。若需标注引用来源，可使用 `<cite>`  或 `<footer>` 标签添加文献来源，同时可通过 `[^1]` 或 `[^note]` 格式插入脚注。

### 多个段落

#### 语法

```markdown
> 天地不仁，以万物为刍狗。
>
> **提示**：引用块内可使用 _Markdown 语法_。
```

#### 效果

> 天地不仁，以万物为刍狗。
>
> **提示**：引用块内可使用 _Markdown 语法_。


## 表格

使用三个或多个连字符 `---` 分隔标题，并使用管道符 `|` 分隔每列，即可创建表格。

### 语法

```markdown
| 斜体   | 粗体     | 代码   |
| ----- | ------- | ------ |
| _斜体_ | **粗体** | `代码` |
| _斜体_ | **粗体** | `代码` |
```

### 效果

| 斜体   | 粗体     | 代码   |
| ----- | -------- | ----- |
| _斜体_ | **粗体** | `代码` |
| _斜体_ | **粗体** | `代码` |



## 代码块

在代码的顶部与底部添加三个反引号 ```` ``` ````，即可创建代码块。在顶部的反引号后标注语言类型，例如 html、javascript、css、markdown 等，即可实现语法高亮。

### 语法

````markdown
```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>HTML5 示例文档</title>
  </head>
  <body>
    <p>测试</p>
  </body>
</html>
```
````

### 效果

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>HTML5 示例文档</title>
  </head>
  <body>
    <p>测试</p>
  </body>
</html>
```

## 列表

### 有序列表

#### 语法

```markdown
1. 第一项
2. 第二项
3. 第三项
```

#### 效果

1. 第一项
2. 第二项
3. 第三项

### 无序列表

#### 语法

```markdown
- 列表项
- 图表项
- 更多项
```

#### 效果

- 列表项
- 图表项
- 更多项

### 嵌套列表

#### 语法

```markdown
- 水果
  - 苹果
  - 橙子
  - 香蕉
- 蔬菜
  - 青菜
  - 萝卜
```

#### 效果

- 水果
  - 苹果
  - 橙子
  - 香蕉
- 蔬菜
  - 青菜
  - 萝卜


#### 语法

```markdown

#### GFM task list

- [x] GFM task list 1
- [x] GFM task list 2
- [ ] GFM task list 3
    - [ ] GFM task list 3-1
    - [ ] GFM task list 3-2
    - [ ] GFM task list 3-3
- [ ] GFM task list 4
    - [ ] GFM task list 4-1
    - [ ] GFM task list 4-2
```
#### 效果

#### GFM task list

- [x] GFM task list 1
- [x] GFM task list 2
- [ ] GFM task list 3
    - [ ] GFM task list 3-1
    - [ ] GFM task list 3-2
    - [ ] GFM task list 3-3
- [ ] GFM task list 4
    - [ ] GFM task list 4-1
    - [ ] GFM task list 4-2



## 其他元素

包括 `<sup>` 上标，`<sub>` 下标，`<abbr>` 缩写，`<del>` 删除线，`<u>` 波浪线，`<kbd>` 键盘输入，`<mark>` 高亮。

### 语法

```markdown
H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

<abbr title="Graphics Interchange Format">GIF</abbr> 是一种位图图像格式。

书籍是人类进步的<del>楼梯</del>阶梯。

优秀的作者总是会仔细检查<u title="拼">拚</u>写错误。

按下 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Delete</kbd> 以结束会话。

大多数<mark>蝾螈</mark>昼伏夜出，以昆虫、蠕虫等小生物为食。
```

### 效果

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

<abbr title="Graphics Interchange Format">GIF</abbr> 是一种位图图像格式。

书籍是人类进步的<del>楼梯</del>阶梯。

优秀的作家总是会仔细检查<u title="拼写">拚写</u>问题。

按下 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Delete</kbd> 以结束会话。

大多数<mark>蝾螈</mark>昼伏夜出，以昆虫、蠕虫等小生物为食。



### 插入视频语法


```markdown
<video controls width="500" src="https://streamshare.wireway.ch/download/6e8h6xq6"></video>

[这位卖货小姐姐天赋如何？.mp4](https://streamshare.wireway.ch/download/6e8h6xq6)


```

#### 效果
<video controls width="500" src="https://streamshare.wireway.ch/download/6e8h6xq6"></video>

[这位卖货小姐姐天赋如何？.mp4](https://streamshare.wireway.ch/download/6e8h6xq6)

--------------------------
 
# Markdown是一种轻量级的「标记语言」
 
> Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式。它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面，Markdown文件的后缀名便是“.md”
 

### 字符效果和横线等
----
 
~~删除线~~ <s>删除线（开启识别HTML标签时）</s>
 
*斜体字*      _斜体字_
 
**粗体**  __粗体__
 
***粗斜体*** ___粗斜体___
 
上标：X<sub>2</sub>，下标：O<sup>2</sup>
 
**缩写(同HTML的abbr标签)**
 
> 即更长的单词或短语的缩写形式，前提是开启识别HTML标签时，已默认开启
 
The <abbr title="Hyper Text Markup Language">HTML</abbr> specification is maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.
### 引用 Blockquotes
 
> 引用文本 Blockquotes
 
引用的行内混合 Blockquotes
 
> 引用：如果想要插入空白换行`即<br />标签`，在插入处先键入两个以上的空格然后回车即可，[普通链接](https://www.baidu.com/)。
 
### 锚点与链接 Links
[普通链接](https://www.baidu.com/)
[普通链接带标题](https://www.baidu.com/ "普通链接带标题")
直接链接：<https://www.baidu.com>
[锚点链接][anchor-id]
[anchor-id]: https://www.baidu.com/
[mailto:test.test@gmail.com](mailto:test.test@gmail.com)
GFM a-tail link @pandao
邮箱地址自动链接 test.test@gmail.com  www@vip.qq.com
> @pandao
 
### 多语言代码高亮 Codes
 
#### 行内代码 Inline code
 
 
执行命令：`npm install marked`
 
 
#### JS代码
```javascript
function test() {
	console.log("Hello world!");
}
```
 
#### HTML 代码 HTML codes
```html
<!DOCTYPE html>
<html>
    <head>
        <mate charest="utf-8" />
        <meta name="keywords" content="Editor.md, Markdown, Editor" />
        <title>Hello world!</title>
        <style type="text/css">
            body{font-size:14px;color:#444;font-family: "Microsoft Yahei", Tahoma, "Hiragino Sans GB", Arial;background:#fff;}
            ul{list-style: none;}
            img{border:none;vertical-align: middle;}
        </style>
    </head>
    <body>
        <h1 class="text-xxl">Hello world!</h1>
        <p class="text-green">Plain text</p>
    </body>
</html>
```
### 图片 Images
 
图片加链接 (Image + Link)：
 
 
![](https://streamshare.wireway.ch/download/r3obhdqk "markdown")
 
> 断编残简！
> 竹简的物理局限性，导致容易断章取义。
 
----
### 列表 Lists
 
#### 无序列表（减号）Unordered Lists (-)
 
- 列表一
- 列表二
- 列表三
 
#### 无序列表（星号）Unordered Lists (*)
 
* 列表一
* 列表二
* 列表三
 
#### 无序列表（加号和嵌套）Unordered Lists (+)
+ 列表一
+ 列表二
    + 列表二-1
    + 列表二-2
    + 列表二-3
+ 列表三
    * 列表一
    * 列表二
    * 列表三
#### 有序列表 Ordered Lists (-)
 
1. 第一行
2. 第二行
3. 第三行
 
----
 
### 绘制表格 Tables
 
| 项目        | 价格   |  数量  |
| --------   | -----:  | :----:  |
| 计算机      | $1600   |   5     |
| 手机        |   $12   |   12   |
| 管线        |    $1    |  234  |
 
 
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
 
 
| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
 
| Function name | Description                    |
| ------------- | ------------------------------ |
| `help()`      | Display the help window.       |
| `destroy()`   | **Destroy your computer!**     |
 
| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |
 
| Item      | Value |
| --------- | -----:|
| Computer  | $1600 |
| Phone     |   $12 |
| Pipe      |    $1 |
 


 
