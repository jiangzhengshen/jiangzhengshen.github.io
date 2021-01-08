### ETA权值

$$ ETA = \sum_{link} eta_i $$

$$ eta_i = f(当前link/周边link \times HTS/liveHTS/预测速度, ...) $$

#### 静态HTS
##### 预测秒
$$ \argmin_\theta \left|ata - \sum_{link} eta_{i, t}(\theta)\right| $$

$$ \argmin_\theta \left|1 - \sum_{link} \frac{eta_{i, t}(\theta)}{ata}\right| $$

$$ \argmin_\theta \left|\frac{ata}{length} - \sum_{link} \frac{eta_{i, t}(\theta)}{length}\right| $$

##### 预测秒/米
$$ \argmin_\theta \left|ata - \sum_{link} l_i \times eta_{i, t}(\theta)\right| $$

$$ \argmin_\theta \left|1 - \sum_{link} \frac{l_i \times eta_{i, t}(\theta)}{ata}\right| $$

$$ \argmin_\theta \left|\frac{ata}{length} - \sum_{link} \frac{l_i \times eta_{i, t}(\theta)}{length}\right| $$

最后一种，不同样本、不同link的$\frac{l_i}{length}$比较稳定，方差小，训练应该是最容易的。

##### eta平方模型
$$ eta(\theta) = \theta^2 $$

##### eta指数模型
$$ eta(\theta) = e^\theta $$

预测秒/米，ata加权：
$$ \argmin_\theta \left|1 - \sum_{link} \frac{l_i \times e^{\theta_i}}{ata}\right| $$

$$ e^{\theta_i} = \frac{1}{hts_i} $$

$$ \theta_i = - \ln hts_i $$

$$ hts_i = \frac{1}{e^{\theta_i}} $$

梯度下降：
$$ \theta^{(k)}_i = \left\{ \begin{matrix}
\theta^{(k-1)}_i - \alpha \frac{l_i \times e^{\theta^{(k-1)}_i}}{ata}, & eta > ata \\
0, & eta = ata \\
\theta^{(k-1)}_i + \alpha \frac{l_i \times e^{\theta^{(k-1)}_i}}{ata}, & eta < ata
\end{matrix} \right. $$

##### 时间平滑
$$ eta_{i, t} = \frac{1}{13}\sum_{t'=t-6}^{t+6} eta_{i, t'} $$

预测秒/米，ata加权：
$$ \argmin_\theta \left|1 - \sum_{link} \frac{l_i \times \frac{1}{13}\sum_{t'=t-6}^{t+6} e^{\theta_{i, t'}}}{ata}\right| $$

梯度下降：
$$ \theta^{(k)}_{i, t'} = \left\{ \begin{matrix}
\theta^{(k-1)}_{i, t'} - \alpha \frac{l_i \times \frac{1}{13} e^{\theta_{i, t'}}}{ata}, & eta > ata \\
0, & eta = ata \\
\theta^{(k-1)}_{i, t'} + \alpha \frac{l_i \times \frac{1}{13} e^{\theta_{i, t'}}}{ata}, & eta < ata
\end{matrix} \right. $$

平方损失：
$$ \argmin_\theta \left( \sum_{link} \frac{l_i \times \frac{1}{13}\sum_{t'=t-6}^{t+6} e^{\theta_{i, t'}}}{ata} - 1 \right)^2 $$

梯度下降：
$$ \theta^{(k)}_{i, t'} = \theta^{(k-1)}_{i, t'} - \alpha \frac{l_i \times \frac{1}{13} e^{\theta_{i, t'}}}{ata} \cdot \Delta $$

$$ \Delta = \sum_{link} \frac{l_i \times \frac{1}{13}\sum_{t'=t-6}^{t+6} e^{\theta_{i, t'}}}{ata} - 1 $$

##### 空间平滑
