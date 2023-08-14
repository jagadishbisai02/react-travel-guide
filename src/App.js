import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

// Replace your code here
const apiStatusConstant = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
}

class App extends Component {
  state = {travelGuideList: [], apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstant.loading})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.packages.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
        description: eachItem.description,
      }))

      this.setState({
        travelGuideList: fetchedData,
        apiStatus: apiStatusConstant.success,
      })
    }
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-icon">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {travelGuideList} = this.state

    return (
      <div className="travel-container">
        <div className="travel-heading-container">
          <h1 className="travel-heading">Travel Guide</h1>
        </div>

        <ul className="travel-list">
          {travelGuideList.map(each => (
            <li className="travel-list-items" key={each.id}>
              <img src={each.imageUrl} alt={each.name} />
              <div className="travel-content">
                <h1 className="travel-list-headings">{each.name}</h1>
                <p className="travel-list-description">{each.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  finalRender = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.loading:
        return this.loadingView()
      case apiStatusConstant.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    return <div className="travel-guide-lists">{this.finalRender()}</div>
  }
}

export default App
