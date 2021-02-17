---
title: tex语言理解
author: Jenson
published: 2015/07/05
description: 对PostScript、DVI、Tex、Latex的个人理解。
image: /photos/TeX.png
category: 编译技术
tags: tex, markdown
---

tex由Knuth创建，起初是使用web语言编写的，整个tex只有一个文件tex.web。

web文件中同时包含了代码以及说明这些代码的文字，这些文字也可以理解为代码的注释，但Knuth本意其实是“夹叙夹议”的编写代码，所以这些文字要比通常的注释更长，也更为文学化。

web语言带有两个编译器，weave和tangle。使用weave编译tex.web，可以得到一个tex.tex文件，这个就是web文件中的文字部分。使用tangle编译，会得到一个tex.p文件，是web中的代码，为pascal语言。然后用pascal编译tex.p后得到tex可执行文件，最后tex tex.tex得到文字部分对应的dvi文件。

下面说一下tex、latex、dvi、postScript、pdf之间的关系。

## 1. PostScript和PDF
这两个都是页面描述语言（Page Description Language, PDL），也是现在的出版印刷领域常用的两种描述语言。

PostScript(PS)大体上是以代码的方式生成矢量图形的语言，也包括如何载入字体等等。由于许多打印机是点阵式输出，所以需要将PostScript格式的数据转换为点阵数据，这就需要一个光栅图像处理器（Raster Image Processor, RIP），RIP可以是软件也可以是硬件，它的功能就是读入PS数据然后转换为点阵数据。所以，对于支持PS格式的打印机，需要传给打印机的就是一个PS文件。

PDF格式是PS的子集，是针对网络出版的一种格式。方便了网络上传输和查看，并增加了一些交互功能。PDF可以传给支持PDF的打印机进行打印，而不需要转为PS格式。在不支持PDF的打印机上，则要先转为PS格式才能进行打印。

当然，上面的内容是打印机驱动所做的工作，已经对用户屏蔽了这些过程。

## 2. DVI
DVI（DeVice Independent）文件是tex文件编译后的输出格式。起初Knuth实现的tex是输出到一个特定的输出设备的，然而这种方式限制了tex的使用范围，故听从了同事的建议改为输出到一个DVI格式的文件中。这个文件格式是Knuth和他的同事设计的，独立于具体的输出设备。这个文件格式类似于PS。可以通过一些工具将其转换为PS或PDF文件。

## 3. tex
Knuth的代码本质上是实现了一个从tex文件到dvi文件的解析器。

Knuth定义了tex这个标记语言，然后定义了dvi页面描述语言，tex程序就是做了解析和转换工作，也可以说是渲染工作。

tex类似于html语言，并且在描述能力上，静态页面的部分二者几乎是相同的。tex可以实现的公式排版，使用html+css也同样可以做到，例如MathJax。

渲染方面，tex使用tex.p程序进行渲染，结果是可以输出到打印机的dvi文件。而html则是浏览器进行渲染，结果是可以使用显卡输出到屏幕的opengl语句。

## 4. latex
原始的tex语言只提供了300条语句，可以说是最为基本的300条语句。为了方便文档撰写，人们编写了许多的宏，这就类似于C语言中的宏，将许多重复性的过程封装到一个宏语句中。tex的宏由于允许分支和循环语句，所以功能十分强大，可以实现很复杂的功能。

即使是看起来十分底层的plain Tex，也是包含了许多的宏定义的。

latex就是众多宏中的一个。

latex标记语言类似于现在流行的Markdown，只不过要比Markdown强大许多，代价是学习成本也要高许多。这主要是因为latex面向的是纸质文章、书籍的排版，而markdown则面向网络，且追求文字撰写的流畅性。

latex在执行时会先进行宏替换，转换为tex文件，然后再解析。Markdown则是先转换为html语言，再在浏览器中进行解析。

