import React from 'react'
import { Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import { getBookList } from '../../api/books'
import PropTypes from 'prop-types'

const { Option } = Select

export default class BookSelect extends React.Component {
  propTypes = {
    onChange: PropTypes.func,
  }
  constructor(props) {
    super(props)
    this.lastFetchId = 0
    this.getBook = debounce(this.getBook, 800)
  }

  state = {
    data: [],
    value: [],
    fetching: false,
  }

  getBook = (value) => {
    console.log(value)
    this.lastFetchId += 1
    const fetchId = this.lastFetchId
    this.setState({ data: [], fetching: true })
    getBookList({
      search: value,
      status: 1,
    })
      .then((res) => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return
        }
        if (res.code === 1) {
          const { list = [] } = res.data || {}
          this.setState({
            data: list,
          })
        }
      })
      .finally(() => {
        this.setState({ fetching: false })
      })
  }

  handleChange = (value) => {
    console.log(value)
    if (this.props.onChange) {
      this.props.onChange(value.key)
    }
    this.setState({
      value,
      data: [],
      fetching: false,
    })
  }

  render() {
    const { fetching, data, value } = this.state
    return (
      <Select
        showSearch
        labelInValue
        value={value}
        placeholder="选择任务"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.getBook}
        onChange={this.handleChange}
        style={{ width: '100%' }}
      >
        {data.map((d) => (
          <Option key={d.id}>{d.bookName}</Option>
        ))}
      </Select>
    )
  }
}
