Qucit Parking，预测找车位时间

$$ p(\theta|x)=\frac{p(x|\theta)p(\theta)}{p(x)} $$

$p(\theta|x)$：后验分布posterior
$p(\theta)$：先验分布prior
$p(x|\theta)$：似然函数likelihood
$p(x)$：evidence

距离 -> MLE -> KL散度
正则 -> MAP -> 贝叶斯推断
最大熵是模型，MLE和MAP都是估计方法

总变差（total variation，TV），f散度，也解释了MLE本质是KL散度：https://www.zhihu.com/question/24124998/answer/707507256
另一个解释MLE本质为KL散度的：https://zhuanlan.zhihu.com/p/84764177
密度估计方法：https://zhuanlan.zhihu.com/p/73426787

### 最小二乘法
平方损失：
$$ loss(y_i, f(x_i)) = \left(y_i-f(x_i)\right)^2 $$

目标函数：
$$ \hat{\theta} = \argmin_\theta {\sum_{i}\left(y_i-f(x_i)\right)^2} $$

模型：
$$ f(x_i) = \bm{\omega} \cdot \bm{x} $$

https://www.zhihu.com/question/20447622

### 极大似然估计
$$ \begin{aligned}
\hat{\theta} &= \argmax_\theta {p(D|\theta)} \\
&= \argmax_\theta {\log {p(D|\theta)}} \\
&= \argmax_\theta {\prod_{i} p(y_i|x_i, \theta)} \\
&= \argmax_\theta {\sum_{i} \log {p(y_i|x_i, \theta)}}
\end{aligned} $$

最小化负对数似然：
$$ NLL(\theta) = -\sum_{i} \log {p(y_i|x_i, \theta)} $$

#### 一般的回归问题
假定
$$ y = f_\theta(x) + \epsilon $$

其中，$\epsilon$为随机变量，且$\epsilon\sim N(0, \sigma^2)$。

```
关于线性回归中，自变量是否是随机变量的问题：https://www.zhihu.com/question/30020874
```

因此，$y_i\sim N(f(x_i), \sigma^2)$，即
$$ p(y_i)=\frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(y_i-f(x_i))^2}{2\sigma^2}} $$

此时负对数似然为
$$ NLL(\theta) = \frac{1}{2\sigma^2}\sum_i {(y_i-f(x_i))^2} + N\log\sigma + \frac{N}{2}\log{2\pi} $$

最小化负对数似然：
$$ \begin{aligned}
\hat{\theta} &= \argmin_\theta {NLL(\theta)} \\
&= \argmin_\theta {\sum_i {(y_i-f(x_i))^2}}
\end{aligned} $$

所得最优$f(x)$的性质：为样本均值

**绝对值损失**
[working] 假定y为拉普拉斯分布，鲁棒回归

所得最优$f(x)$的性质：为样本中位数

#### 方差模型
$y = f_\theta(x) + \epsilon$的假设太强。放松为：
$$ y_i\sim N(f(x_i), \sigma(x_i)^2) $$

此时负对数似然为
$$ NLL(\theta) = \frac{1}{2\sigma(x_i)^2}\sum_i {(y_i-f(x_i))^2} + N\log\sigma(x_i) + \frac{N}{2}\log{2\pi} $$

最小化负对数似然：
$$ \begin{aligned}
\hat{\theta} &= \argmin_\theta {NLL(\theta)} \\
&= \argmin_\theta {\sum_i { \lbrace \frac{(y_i-f(x_i))^2}{2\sigma(x_i)^2} + \log\sigma(x_i) \rbrace}}
\end{aligned} $$

损失函数：
$$ loss(y_i, f(x_i), \sigma(x_i)) = \frac{(y_i-f(x_i))^2}{2\sigma(x_i)^2} + \log\sigma(x_i) $$

这种方法详见：`1994 - Estimating the Mean and Variance of the Target Probability Distribution - IEEE`，但实际上更早。

#### Logistic回归
伯努利分布
Categorical distribution

### 最大后验估计
后验分布：
$$ p(\theta|x)=\frac{p(x|\theta)p(\theta)}{p(x)} $$

最大后验估计：
$$ \begin{aligned}
\hat{\theta} &= \argmax_\theta {p(\theta|D)} \\
&= \argmax_\theta {\log {p(\theta|D)}} \\
&= \argmax_\theta {\sum_i \log \frac{p(y_i|x_i, \theta)p(\theta)}{p(x_i, y_i)}} \\
&= \argmax_\theta {\sum_i \left[\log p(y_i|x_i, \theta) + \log p(\theta) - \log p(x_i, y_i)\right]} \\
&= \argmax_\theta {\sum_i \left[\log p(y_i|x_i, \theta) + \log p(\theta)\right]} \\
\end{aligned} $$

`注意：第三个等号处，是因为$p(x_i|\theta)=p(x_i)$，即$x_i$与$\theta$无关`

与极大似然估计只差一个$\log p(\theta)$。

#### 岭回归
假定$\theta\sim N(0, \tau^2)$，那么
$$ \log p(\theta) = -\frac{1}{2\tau^2}\theta^2 - \log\tau\sqrt{2\pi} $$

最大后验估计：
$$ \begin{aligned}
\hat{\theta} &= \argmin_\theta {\sum_i \left[-\log p(y_i|x_i, \theta) - \log p(\theta)\right]} \\
&= \argmin_\theta {\left[\frac{1}{2\sigma^2}\sum_i {(y_i-f(x_i))^2} + N\log\sigma + \frac{N}{2}\log{2\pi}\right] + N\left[\frac{1}{2\tau^2}||\theta||^2 + \log\tau\sqrt{2\pi}\right]} \\
&= \argmin_\theta {\left[\frac{1}{2\sigma^2}\sum_i {(y_i-f(x_i))^2} \right] + N\left[\frac{1}{2\tau^2}||\theta||^2 \right]} \\
&= \argmin_\theta {\sum_i \left[(y_i-f(x_i))^2 + \lambda||\theta||^2 \right] }
\end{aligned} $$

#### LASSO
假定$\theta\sim Laplace(0, b)$，那么
$$ \log p(\theta) = -\frac{|\theta|}{b} - \log2b $$

其中，拉普拉斯分布：
$$ f(x|\mu,b) = \frac{1}{2b} \exp \left( -\frac{|x-\mu|}{b} \right) $$

最大后验估计：
$$ \begin{aligned}
\hat{\theta} &= \argmin_\theta {\sum_i \left[(y_i-f(x_i))^2 + \lambda||\theta||_1 \right] }
\end{aligned} $$

### 如何扩展到树模型
#### gbdt同时预测均值方差
直接换用损失函数：
$$ loss(y_i, f(x_i), \sigma(x_i)) = \frac{(y_i-f(x_i))^2}{2\sigma(x_i)^2} + \log\sigma(x_i) $$

可能会不易训练：
- $\mu$和$\sigma$互相影响
- $\sigma$出现在分母上，梯度容易爆炸

#### 固定均值模型单独训练方差模型
可以直接估计$r=\frac{\mu}{\sigma}$，此时损失函数变为：
$$ loss(y, r) = \frac12 (\frac{y}{\mu} - 1)^2 \cdot r^2 + \log\mu - \log{r} $$

#### NgBoost
- https://medium.com/@benbenbang/ngboost-intro-and-comparisons-df72adf94096
- https://www.zhihu.com/question/266846405
- https://www.zhihu.com/question/21923317
- http://kvfrans.com/what-is-the-natural-gradient-and-where-does-it-appear-in-trust-region-policy-optimization/：一个比较直观的解释

从KL散度出发，采用KL散度的二阶近似，即Fisher度量（Fisher信息矩阵），在此度量下对损失函数求梯度，可得自然梯度

catboost有支持

#### Fisher信息矩阵
$$ \begin{aligned}
I_{ij} &= \int{\frac{\partial\ln p(x|\theta)}{\partial\theta_i} \frac{\partial\ln p(x|\theta)}{\partial\theta_j} p(x|\theta)dx} \\
&= -E_X\left[ \frac{\partial^2\ln p(x|\theta)}{\partial\theta_i\partial\theta_j} \right]
\end{aligned} $$

这里解释了推导过程：http://mark.reid.name/blog/fisher-information-and-log-likelihood.html

核心是两个公式：
$$ \int \frac{\partial^2\ln p(x|\theta)}{\partial\theta_i\partial\theta_j} dx = \frac{\partial^2}{\partial\theta_i\partial\theta_j}\int p(x|\theta) dx = \frac{\partial^2}{\partial\theta_i\partial\theta_j} 1 = 0 $$

$$ \frac{\partial^2\ln p(x|\theta)}{\partial\theta_i\partial\theta_j} = \frac{\partial}{\partial\theta_i}\left( \frac{1}{p(x|\theta)}\frac{\partial p(x|\theta)}{\partial\theta_j} \right) = \frac{1}{p(x|\theta)}\frac{\partial^2 p(x|\theta)}{\partial\theta_i\partial\theta_j} - \frac{1}{(p(x|\theta))^2}\frac{\partial p(x|\theta)}{\partial\theta_i}\frac{\partial p(x|\theta)}{\partial\theta_j} $$

再求期望，即得上述Fisher信息矩阵的形式。

#### 正态分布的自然梯度
##### 参数化1
参数：$\mu$和$r=\log\sigma$

$$ p(x;\mu, \sigma)=\frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}} $$

$$ \begin{aligned}
\log p &= -\frac{1}{2\sigma^2} {(x-\mu)^2} - \log\sigma - \frac{1}{2}\log{2\pi} \\
&= -\frac{1}{2e^{2r}} {(x-\mu)^2} - r - \frac{1}{2}\log{2\pi}
\end{aligned} $$

$$ \frac{\partial\log p}{\partial\mu} = \frac{1}{\sigma^2} {(x-\mu)} $$

$$ E_X\left[ \frac{\partial^2\log p}{\partial\mu^2} \right] = -\frac{1}{\sigma^2} $$

$$ E_X\left[ \frac{\partial^2\log p}{\partial\sigma\partial\mu} \right] = E_X\left[ -\frac{2}{\sigma^3} (x-\mu) \right] = 0 $$

$$ \frac{\partial\log p}{\partial\sigma} = \frac{1}{\sigma^3} {(x-\mu)^2} - \frac1\sigma $$

$$ \frac{\partial\log p}{\partial r} = \frac{\partial\log p}{\partial\sigma} \frac{\partial\sigma}{\partial r} = \frac{1}{\sigma^2} {(x-\mu)^2} - 1 $$

$$ E_X\left[ \frac{\partial^2\log p}{\partial r^2} \right] = E_X\left[ -\frac{2}{\sigma^2} (x-\mu)^2 \right] = -2 $$

$$ E_X\left[ \frac{\partial^2\log p}{\partial\mu\partial r} \right] = E_X\left[ -\frac{2}{\sigma^2} (x-\mu) \right] = 0 $$

注意：二阶导数的链式法则
$$ \frac{d^2y}{dx^2} = \frac{d^2y}{du^2}\left(\frac{du}{dx}\right)^2 + \frac{d^2u}{dx^2}\frac{dy}{du} $$

因此
$$ I = \left[ \begin{matrix}
\frac{1}{\sigma^2} & 0 \\
0 & 2
\end{matrix} \right] $$

自然梯度：
$$ \left[ \begin{matrix}
\frac{1}{\sigma^2} & 0 \\
0 & 2
\end{matrix} \right]^{-1} \cdot
\left[ \begin{matrix}
\frac{1}{\sigma^2} {(x-\mu)} \\
\frac{1}{\sigma^2} {(x-\mu)^2} - 1
\end{matrix} \right] = 
\left[ \begin{matrix}
(x-\mu) \\
\frac{1}{2\sigma^2} {(x-\mu)^2} - \frac12
\end{matrix} \right] $$

最优解：
$$ \begin{aligned}
x &= \mu \\
\sigma^2 &= (x-\mu)^2
\end{aligned} $$

参见：https://github.com/catboost/catboost/blob/4e4533763f57e950694e1e437ba777097f999a64/catboost/private/libs/algo_helpers/error_functions.h#L239

##### 参数化2
参数：$\mu$和$\sigma$

$$ E_X\left[ \frac{\partial^2\log p}{\partial \sigma^2} \right] = E_X\left[ -\frac{3}{\sigma^4} (x-\mu)^2 + \frac{1}{\sigma^2} \right] = -\frac{2}{\sigma^2} $$

$$ I = \left[ \begin{matrix}
\frac{1}{\sigma^2} & 0 \\
0 & \frac{2}{\sigma^2}
\end{matrix} \right] $$

自然梯度：
$$ \left[ \begin{matrix}
\frac{1}{\sigma^2} & 0 \\
0 & \frac{2}{\sigma^2}
\end{matrix} \right]^{-1} \cdot
\left[ \begin{matrix}
\frac{1}{\sigma^2} {(x-\mu)} \\
\frac{1}{\sigma^3} {(x-\mu)^2} - \frac1\sigma
\end{matrix} \right] = 
\left[ \begin{matrix}
(x-\mu) \\
\frac{1}{2\sigma} {(x-\mu)^2} - \frac12\sigma
\end{matrix} \right] $$

最优解：
$$ \begin{aligned}
x &= \mu \\
\sigma^2 &= (x-\mu)^2
\end{aligned} $$

##### 参数化3
参数：$\mu$和$\sigma^2$

$$ \frac{\partial\log p}{\partial\sigma} = \frac{1}{\sigma^3} {(x-\mu)^2} - \frac1\sigma $$

$$ \frac{\partial\log p}{\partial(\sigma^2)} = \frac{1}{2\sigma^4} {(x-\mu)^2} - \frac{1}{2\sigma^2} $$

$$ E_X\left[ \frac{\partial^2\log p}{\partial (\sigma^2)^2} \right] = E_X\left[ -\frac{1}{\sigma^6} (x-\mu)^2 + \frac{1}{2\sigma^4} \right] = -\frac{1}{2\sigma^4} $$

$$ I = \left[ \begin{matrix}
\frac{1}{\sigma^2} & 0 \\
0 & \frac{1}{2\sigma^4}
\end{matrix} \right] $$

自然梯度：
$$ \left[ \begin{matrix}
\frac{1}{\sigma^2} & 0 \\
0 & \frac{1}{2\sigma^4}
\end{matrix} \right]^{-1} \cdot
\left[ \begin{matrix}
\frac{1}{\sigma^2} {(x-\mu)} \\
\frac{1}{2\sigma^4} {(x-\mu)^2} - \frac{1}{2\sigma^2}
\end{matrix} \right] = 
\left[ \begin{matrix}
(x-\mu) \\
{(x-\mu)^2} - \sigma^2
\end{matrix} \right] $$

目前深度模型使用的参数化方法，负对数似然，对应的损失函数为（注意自变量为$\mu$和$\sigma^2$）
$$ \left[ \begin{matrix}
(x-\mu)^2 \\
\sigma^4 - 2\sigma^2(x-\mu)^2
\end{matrix} \right] $$

两个损失函数需要分别优化，设置stop_gradient

最优解：
$$ \begin{aligned}
x &= \mu \\
\sigma^2 &= (x-\mu)^2
\end{aligned} $$

可参见：https://math.stackexchange.com/questions/2736992/finding-the-fishers-information-in-a-normal-distribution-with-known-mu-and-u/2737043

#### 集成模型的方式
全量不确定性：集成模型的不确定性
数据不确定性：多个模型，平均方差
知识不确定性：数据采集稀疏/缺失导致的不确定性

需要训练多个GBDT，解法：virtual ensemble，依赖郎之万boosting
- catboost有支持

#### other
##### Uncertainty in Gradient Boosting via Ensembles
- CatBoost with RMSEWithUncertainty：https://towardsdatascience.com/tutorial-uncertainty-estimation-with-catboost-255805ff217e
- https://catboost.ai/docs/references/uncertainty.html
- aleatoric uncertainty, epistemic uncertainty
```
Data uncertainty arises due to the inherent complexity of the data, such as additive noise or overlapping classes. In these cases, the model knows that the input has attributes of multiple classes or that the target is noisy. Importantly, data uncertainty cannot be reduced by collecting more training data.
Aleatoric uncertainty is due to genuine stochasticity in the data. In this situation, an uncertain prediction is the best possible prediction. This corresponds to noisy data; no matter how much data the model has seen, if there is inherent noise then the best prediction possible may be a high entropy one (for example, if we train a model to predict coin flips, the best prediction is the max-entropy distribution P(heads) = P(tails)).

Knowledge uncertainty arises when the model is given an input from a region that is either sparsely covered by the training data or far from the training data. In these cases, the model knows very little about this region and is likely to make a mistake. Unlike data uncertainty, knowledge uncertainty can be reduced by collecting more training data from a poorly understood region.
Epistemic uncertainty is uncertainty due to our lack of knowledge; we are uncertain because we lackunderstanding. In terms of machine learning, this corresponds to a situation where our model parameters are poorly determined due to a lack of data, so our posterior over parameters is broad.

For regression, knowledge uncertainty can be obtained by measuring the variance of the mean across multiple models. Note that this is different from the predicted variance of a single model, which captures data uncertainty.
```

randomly drop some trees in trained GBDT model
- https://github.com/Microsoft/LightGBM/issues/1815
- You can use shuffle_models https://lightgbm.readthedocs.io/en/latest/Python-API.html#lightgbm.Booster.shuffle_models, then use num_iterations in predict.

[working] Simple and Scalable Predictive Uncertainty Estimation using Deep Ensembles

### 朴素方法
#### 树模型统计叶节点方差
先训练，再统计

#### 回归模型 + 预估平方损失的模型
- https://qucit.com/a-simple-technique-to-estimate-prediction-intervals-for-any-regression-model_en/

相当于假设一个什么分布？

### 分位数回归（quantile regression）
- https://heartbeat.fritz.ai/5-regression-loss-functions-all-machine-learners-should-know-4fb140e9d4b0 (https://segmentfault.com/a/1190000015320388)
- https://qucit.com/a-simple-technique-to-estimate-prediction-intervals-for-any-regression-model_en/
- https://scikit-learn.org/stable/auto_examples/ensemble/plot_gradient_boosting_quantile.html
- pinball 损失函数：https://www.lokad.com/cn/pinball-%E6%8D%9F%E5%A4%B1%E5%87%BD%E6%95%B0-%E5%AE%9A%E4%B9%89
- pinball 损失函数的证明：https://www.kaggle.com/c/m5-forecasting-uncertainty/discussion/148949
- xgboost中的示例 https://towardsdatascience.com/regression-prediction-intervals-with-xgboost-428e0a018b

正态分布的样本均值为参数$\mu$的极大似然估计
拉普拉斯分布的样本中位数为参数$\mu$的极大似然估计

绝对值损失对应中位数、L0损失对应众数的证明：https://wenda.chinahadoop.cn/question/3705

损失函数，设$\tau\in(0,1)$为分位数
$$ l(y, \hat{y}) = \left\{
\begin{aligned}
\tau\cdot|y-\hat{y}|, &\quad y\ge\hat{y} \\
(1-\tau)\cdot|y-\hat{y}|, &\quad y\lt\hat{y}
\end{aligned}
\right.
$$
对应非对称拉普拉斯分布

$$ l(y, \hat{y}) = \left\{
\begin{aligned}
\tau\cdot(y-\hat{y})^2, &\quad y\ge\hat{y} \\
(1-\tau)\cdot(y-\hat{y})^2, &\quad y\lt\hat{y}
\end{aligned}
\right.
$$
对应非对称高斯分布

Bayesian Quantile And Expectile Optimisation
Bayesian quantile regression

sklearn支持，xgboost可以自定义

### 置信区间
credible intervals

### 贝叶斯深度学习（https://www.zhihu.com/question/352295592）
a general framework, 2019
Weight Uncertainty in Neural Networks
What Uncertainties Do We Need in Bayesian Deep Learning for Computer Vision?
There are some techniques such as Variational Dropout (MC Dropout) to get the uncertanity of predictions (utilized in Deep Bayesian Learning). Such uncertainty metrics are very useful especially when ensembling decisions from several models.
Another solution is like MC dropout, which you can add some noise in the input features.

https://github.com/pmorerio/dl-uncertainty/issues/2

variational dropout：https://www.reddit.com/r/MachineLearning/comments/8lr2lq/d_what_makes_variational_dropout_so_popular_for/
MC Dropout：https://www.cnblogs.com/wuliytTaotao/p/11509634.html

郎之万动力学：https://www.zhihu.com/question/348483881/answer/871584499
2011 - Bayesian Learning via Stochastic Gradient Langevin Dynamics - ICML

不确定度估计：Understanding Measures of Uncertainty for Adversarial Example Detection

### 流模型
Flow model
- 估计 $P(x, y)$ 或 $P(y|x)$

### 评估
Can You Trust Your Model's Uncertainty

#### 平均负对数似然，Negative Log-Likelihood（NLL）
也是KL散度、相对熵

$$ NLL(\theta) = -\sum_{i} \log {p(y_i|x_i, \theta)} $$

$$ \begin{aligned}
l(\theta) &= -\log {p(y|x, \theta)} \\
&= \frac{(y-\mu)^2}{2\sigma^2} + \log\sigma
\end{aligned} $$

#### 平均标准差（无监督）

#### 平均香农熵（无监督）
Differential entropy，微分熵

参见PRML公式1.110
$$ H[x] = \frac12 \left\{ 1+\ln(2\pi\sigma^2) \right\} $$

推导：https://blog.csdn.net/raby_gyl/article/details/73477043

#### Wasserstein Distance
Dirac delta function
https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.wasserstein_distance.html
https://en.wikipedia.org/wiki/Wasserstein_metric

两个正态分布的2-Wasserstein距离为
$$ \left(W_2(\mu_1,\mu_2)\right)^2 = \|m_1-m_2\|_2^2+\mathop {\mathrm {trace} } {\bigl (}C_{1}+C_{2}-2{\bigl (}C_{2}^{1/2}C_{1}C_{2}^{1/2}{\bigr )}^{1/2}{\bigr )} $$

因此
$$ \left(W_2(\mu_1, \mu_2)\right)^2 = (ata-\mu)^2 + \sigma^2 $$

#### Energy Distance
$$ D^2(F, G) = \int_{-\infty}^{\infty} \left( F(x) - G(x) \right)^2 dx $$

https://en.wikipedia.org/wiki/Energy_distance

标准正态分布的累积分布：
$$ \Phi(x) = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^x e^{-t^2/2} dt $$

一般正态分布的累积分布：$\Phi(\frac{x-\mu}{\sigma})$

ata视为Dirac delta function，$ D^2(\mu, \sigma, ata) $是个二重积分

#### other
**General Measures**
Rényi entropy ↓：可用
Tsallis entropy ↓：可用

Brier Score ↓：只适用分类问题
Expected Calibration Error（ECE）↓：分类问题

Mutual information ↓

**Structure-wise Measures**
(Generalized) Energy Distance ↓：可用，Energy statistics: A class of statistics based on distances，scipy.stats.energy_distance
Volume Variation ↓
Dice Agreement ↑
Intersection over union ↑
Mean Uncertainty ↓

https://zhuanlan.zhihu.com/p/110687124

### Note
最大熵：https://plmsmile.github.io/2017/09/20/maxentmodel/
