import styles from '../index.css';
import React from 'react'
import { connect } from 'dva'

import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";
import { Row, Col } from 'antd'
class Index extends React.Component {
  render() {
    const { loading, UserNum, PriceNum, CostNum } = this.props;
    console.log(loading);
    const { DataView } = DataSet;
    const { Html } = Guide;
    const data = [
      {
        item: "",
        count: 40
      }
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    return (
      <div className={styles.normal}>
        <ul className={styles.list}>
          <li>健身中心会员管理系统</li>
        </ul>
        {!loading ? <Row style={{ marginTop: 20 }}>
          <Col span={8}><div>
            <Chart
              data={dv}
              forceFit
            >
              <Coord type={"theta"} radius={0.75} innerRadius={0.6} />

              <Guide>
                <Html
                  position={["50%", "50%"]}
                  html={`<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>用户<br><span style=&quot;color:#262626;font-size:2.5em&quot;>${UserNum}</span>人</div>`}
                  alignX="middle"
                  alignY="middle"
                />
              </Guide>
              <Geom
                type="intervalStack"
                position="percent"
              >
              </Geom>
            </Chart>
          </div></Col>
          <Col span={8}><div>
            <Chart
              data={dv}
              forceFit
            >
              <Coord type={"theta"} radius={0.75} innerRadius={0.6} />

              <Guide>
                <Html
                  position={["50%", "50%"]}
                  html={`<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>商品<br><span style=&quot;color:#262626;font-size:2.5em&quot;>${PriceNum}</span>种</div>`}
                  alignX="middle"
                  alignY="middle"
                />
              </Guide>
              <Geom
                type="intervalStack"
                position="percent"
              >
              </Geom>
            </Chart>
          </div></Col>
          <Col span={8}><div>
            <Chart
              data={dv}
              forceFit
            >
              <Coord type={"theta"} radius={0.75} innerRadius={0.6} />

              <Guide>
                <Html
                  position={["50%", "50%"]}
                  html={`<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>消费记录<br><span style=&quot;color:#262626;font-size:2.5em&quot;>${CostNum}</span>条</div>`}
                  alignX="middle"
                  alignY="middle"
                />
              </Guide>
              <Geom
                type="intervalStack"
                position="percent"
              >
              </Geom>
            </Chart>
          </div></Col>
        </Row> : ''}

      </div>
    );
  }
}
function mapStateToProps(state) {
  const { UserNum, PriceNum, CostNum } = state.admin
  return {
    loading: state.loading.models.admin,
    UserNum,
    PriceNum,
    CostNum,
  }
}

export default connect(mapStateToProps)(Index);