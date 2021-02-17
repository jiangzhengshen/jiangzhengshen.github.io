
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
- DGLBACKEND=[BACKEND] python gcn.py
- 测试demo

选型
- 图采样
  - plato：支持超大图
  - dgl：亿级
- embedding
  - 亿级 * 2维可能不需要分布式；dgl支持；plato暂不支持
  - 自定义op：https://www.tensorflow.org/guide/create_op，是否比embedding_table紧凑，不好说
  - 需要parameter server，https://www.infoq.cn/article/1tgrust6kf030tluq0pb；https://zhuanlan.zhihu.com/p/108464732
- DGL：dmlc组织
- ETA适合小图方案，因为大图方案只能存静态属性
- link embedding适合大图方案，分布式

### 图算法
PinSage
GraphSage
GCN
GAT

### Embedding

#### 序列Embedding
word2vec
item2vec

#### word embedding

#### graph & network embedding
Line
- 一阶：转无向图，2维 & 5维
- 二阶：有向图，太稀疏，大量link出度和入度均为1，自身emb和context emb会变成同一个，且不与其他link相邻，可能导致平凡解
- https://github.com/snowkylin/line
- https://github.com/VahidooX/LINE
- https://github.com/FrederickGeek8/LINE
- https://github.com/shenweichen/GraphEmbedding
DeepWalk：社交网络随机游走服从幂律分布，与自然语言一致
node2vec
SDNE

##### knowledge graph embedding

#### 双曲嵌入
双曲空间假设：社交网络符合，而交通网络不符合
