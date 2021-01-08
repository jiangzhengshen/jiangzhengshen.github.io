
embedding、图神经网络、分布式
- good demo：https://git.code.oa.com/TencentGraph/Graph-Estimation-Networks/tree/master
- dgl
- tensorflow扩展：https://git.code.oa.com/TencentGraph/PlatoDeep
  - venus支持：https://iwiki.woa.com/display/venus/4.7.25+PlatoDeep
  - 各框架比较：http://km.oa.com/articles/show/440707
- 开箱即用，支持line、word2vec：https://git.code.oa.com/TencentGraph/PlatoEmbedding
  - venus支持：https://iwiki.woa.com/display/venus/4.13.3+Line
- 支持node2vec：https://git.code.oa.com/TencentGraph/plato/blob/master/doc/ALGOs.md
- C++的图计算库：https://git.code.oa.com/mmrecommend/embedx2
- https://git.code.oa.com/groups/TencentGraph/-/projects/list
- pytorch_geometric，只支持pytorch：https://github.com/rusty1s/pytorch_geometric
- tf_geometric，尚不成熟：https://github.com/CrawlScript/tf_geometric

www'18 tutorial：http://snap.stanford.edu/proj/embeddings-www/
https://github.com/chihming/awesome-network-embedding

tensorflow分布式embedding如何实现？

DGL：
- [working] venus镜像：py36, tf1.15.5, cuda 10.0, dgl-cu92, torch==1.7.1+cu92, torchvision==0.8.2+cu92, torchaudio==0.7.2
- 测试demo

### 图算法
PinSage
[next] GraphSage：dgl，plato
GCN
GAT

### Embedding

#### 序列Embedding
word2vec
item2vec

#### word embedding

#### graph & network embedding
[next] Line：dgl，plato
- https://github.com/snowkylin/line
- https://github.com/shenweichen/GraphEmbedding
- 单机：https://github.com/tangjianpku/LINE
- 单机：https://graphvite.io/docs/latest/install.html
DeepWalk：社交网络随机游走服从幂律分布，与自然语言一致
node2vec
SDNE

##### knowledge graph embedding

#### 双曲嵌入
双曲空间假设：社交网络符合，而交通网络不符合
