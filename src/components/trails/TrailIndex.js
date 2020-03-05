import React from 'react'
import axios from 'axios'

import TrailCard from './TrailCard'
import Search from './Search'

class TrailIndex extends React.Component {
  state = {
    trails: [],
    searchTerm: ''
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/trails')
      this.setState({ trails: res.data, searchData: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  basicSearchFunction = (e) => {
    this.setState({ searchTerm: e.target.value })

  }

  filterTrails = () => {
    const searchTerm = new RegExp(this.state.searchTerm, 'i')
    return this.state.trails.filter(trail => searchTerm.test(trail.directions))
  }

  render() {
    return (
      <section className="trailIndex">
        <div className="trailContainer">
          <div className="box">
            <div className="Search">
              
              <Search
                basicSearchFunction={this.basicSearchFunction}
                {...this.state}
              />
            </div>
          </div>
          <div className="columns is-mobile is-multiline">
            {this.filterTrails().map(trail => (
              <TrailCard key={trail.name} {...trail} />
            ))}
          </div>
        </div>
      </section>
    )
  }
}

export default TrailIndex