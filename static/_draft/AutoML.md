
meta-learning

Survey on Automated Machine Learning

ETA pipeline
- TFX、FBLearner Flow、MLflow、Michelangelo、Airflow、Azure机器学习
- 数据预处理、特征工程、模型训练、效果验证、工具多样性、实验记录、实验复现、模型导出、模型部署
- gps data -> __matching & filtering & ata__ -> speedcase & roadwork -> __ETAMakeFeature__ -> feature -> __transform__ -> svm/tfrecord
  -> __train__ -> model -> __predict__ -> pred -> __verify & analysis__ -> result -> __deploy__
- 在线学习的支持：数据实时回流 -> 在线训练 -> 模型导出 -> 验证 -> AB Test -> 部署上线
- 各阶段耗时分析 & 优化

自动特征工程：FeatureLab、ExploreKit、FeatureTools、Deep Feature Synthesis深度特征合成

函数库：
- HyperOpt & HPOLib: 实现了 random search 和 tree of parzen estimators (TPE) 超参数搜索算法，但其框架的实现与算法本身耦合紧密，不利于扩展；同时这些框架将整个实验过程视为一个原子过程，因此无法进行更细粒度的实验控制，无法实现 HyperBand 一类的算法
- Auto-SKLearn & Auto-WEKA & AutoKeras & autoxgboost: 提供了超参数搜索、meta-learning 的封装实现，但这类框架都与具体的机器学习框架绑定（如 Scikit-Learn、WEKA 以及 Keras），无法扩展到其它框架进行使用
- Google Vizier: Google 内部的调优服务，提供了多种超参数优化算法的封装实现，并行实验调度以及训练结果分析，但由于 Google Vizier 属于闭源的商业框架，无法直接学习和使用
- 第四范式先知，谷歌Cloud AutoML
- http://km.oa.com/group/24938/articles/show/404034 这里有个automl工具包的图
- 选型：Ray.Tune，NNI、HyperOpt、https://github.com/fmfn/BayesianOptimization

算法：
- 网格搜索(Grid Search, GS)
- 随机搜索(Random Search,RS)
- 贝叶斯优化(Bayesian Optimization,BO) & 随机坐标收缩(RACOS, RAndomized Coordinate Shrinking)
- tree of Parzen estimators
- Hyperband：强化学习方法
- Population Based Training，PBT
- HyperBand/ASHA
- 基于梯度的方法：RMAD、DrMAD
- 基于搜索的方法

神经架构搜索（Neural Architecture Search / NAS）：AdaNet；https://www.leiphone.com/news/201907/ftBwyOKJUNrx2Cke.html；DARTS: Differentiable Architecture Search；RandWireNN：http://km.oa.com/group/automl/articles/show/375612

https://www.oreilly.com/ideas/what-is-neural-architecture-search

![](automl.png)
