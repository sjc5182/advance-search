/*
# HTML interface (code challange instructions)

Create a simple web interface that will allow the user to do the following tasks:

* Enter in a unit number and display to the screen all the residents of that unit.
* Enter in a first and last name and display all the information we have about that user. (Name, unit of residence, role(s) on property, and devices they are able to control.)

Try to anticipate the user's needs and create an interface that meets them.

Ideally, your final product will work as expected and look nice, but if you are running out of time, focus on getting your JavaScript to work over adding in additional styling. Do not spend more than two hours total on the project.

You can add in additional files to the project folder (e.g. CSS files or icons), but please make sure that we can load the final product in the latest version of a Chrome browser.

## About the data

Sample data are in the file property_data.js. You should not change anything within this file.

The "roles" key on people objects refers to the roles a user has on that property, which impacts what devices they can control.

A person may control a device if:

* It is associated with their unit of residence.
* The device is marked as admin_accessible and the user is an admin.
  * For example, Mackenzie Carroll can control the thermostat, lights, and lock that have a unit value that matches her residence, 102
  * Zakiyya Shabazz can control any device that has a unit value of 201, plus any "Sunnee" light and any lock (because she is an admin and those devices all have admin_accessible marked as true.)
*/
const {
	Dropdown,
  Container,
	Search,
	Segment,
	Card,
	Image,
	Label,
	Icon,
	Header,
	Form,
	Divider,
	List
} = semanticUIReact

// NOTE: not allowed to edit property_data, must use as is
const property_data = {
	"name": "Property Name",
	"address": {
		"address_line_1": "123 main st.",
		"city": "Philadelphia",
		"state": "PA",
		"zip": "19103"
	},
	"devices": {
		"thermostats": [
			{
				"id": 1,
				"unit": 301,
				"model": "Warm-Me",
				"admin_accessible": false
			},
			{
				"id": 2,
				"unit": 201,
				"model": "Warm-Me",
				"admin_accessible": false
			},
			{
				"id": 3,
				"unit": 202,
				"model": "Warm-Me",
				"admin_accessible": false
			},
			{
				"id": 4,
				"unit": 101,
				"model": "Warm-Me",
				"admin_accessible": false
			},
			{
				"id": 5,
				"unit": "101",
				"model": "Warm-Me",
				"admin_accessible": false
			},
		],
		"lights": [
			{
				"id": 1,
				"unit": 101,
				"model": "Bright Ideas",
				"admin_accessible": false
			},
			{
				"id": 2,
				"unit": 102,
				"model": "Bright Ideas",
				"admin_accessible": false
			},
			{
				"id": 3,
				"unit": 201,
				"model": "Bright Ideas",
				"admin_accessible": false
			},
			{
				"id": 4,
				"unit": 202,
				"model": "Bright Ideas",
				"admin_accessible": false
			},
			{
				"id": 5,
				"unit": 301,
				"model": "Bright Ideas",
				"admin_accessible": false
			},
			{
				"id": 6,
				"unit": 301,
				"model": "Sunnee",
				"admin_accessible": true
			},
			{
				"id": 7,
				"unit": 101,
				"model": "Sunnee",
				"admin_accessible": true
			},
			{
				"id": 8,
				"unit": 201,
				"model": "Sunnee",
				"admin_accessible": true
			}
		],
		"locks": [
			{
				"id": 1,
				"unit": 101,
				"model": "SkeletonKey",
				"admin_accessible": true
			},
			{
				"id": 2,
				"unit": 102,
				"model": "LockNess",
				"admin_accessible": true
			},
			{
				"id": 3,
				"unit": 201,
				"model": "LockNess",
				"admin_accessible": true
			},
			{
				"id": 4,
				"unit": 202,
				"model": "SkeletonKey",
				"admin_accessible": true
			},
			{
				"id": 5,
				"unit": 301,
				"model": "LockNess",
				"admin_accessible": true
			}
		]
	}, 
	"people": [
		{
			"first_name": "Ty",
			"last_name": "Adams",
			"unit": "101",
			"roles": ["Admin", "Resident"]
		},
		{
			"first_name": "Mackenzie",
			"last_name": "Carroll",
			"unit": "102",
			"roles": ["Resident"]
		},
		{
			"first_name": "Zakiyya",
			"last_name": "Shabazz",
			"unit": "201",
			"roles": ["Admin", "Resident"]
		},
		{
			"first_name": "Duane",
			"last_name": "Velásquez",
			"unit": "202",
			"roles": ["Resident"]
		},
		{
			"first_name": "Dorothea",
			"last_name": "Brooke",
			"unit": "301",
			"roles": ["Resident"]
		},
		{
			"first_name": "Jian",
			"last_name": "Ma",
			"unit": "301",
			"roles": ["Resident"]
		}
	]
}

/*
TIMELOCK HIT...here is a list of known bugs/issues/missing from this pen
- [ISSUE A] resident role, devices are not listed on name card in a clean way -- something like units.filter(element => element.unit == unit)[0].devices to pass devices as props to then be displayed would be need. i didn't realize this issue until i was looking over the exercise. made quick fixes. should have deep copied object to remove dups then assign prop to determine role type etc...
-search by dropdown, on change value position changes, css issue
-form missing validation
-proptypes not defined for components
-css in general, i did write any for this
*/

const defaultState = {
	property: {
		name: property_data.name,
		address: property_data.address,
	},
	residents: property_data.people.map(person => {
		// add new property/values to use for search and mock data
		person.full_name = `${person.first_name} ${person.last_name}`
		person.avatar = faker.internet.avatar()
		person.description = `Random phrase generator ${faker.company.catchPhrase()}`
		return person
	}),
	units: property_data.people
		.map(element => element.unit) // get the unit ids - [...]
		.filter((element, index, array) => array.indexOf(element) == index) // remove duplicate unit ids - [...]
		.reduce((accumulator, currentValue, currentIndex) => { // create array of unit objects to add properties to each unit object - [{}, ...]
			accumulator[currentIndex] = {
				unit: currentValue,
				residents: property_data.people.filter(element => element.unit == currentValue),
				devices: {}
			}
			for (let deviceType in property_data.devices) { // add devices to each respective unit object - [{..., devices: {...}}, ...]
				accumulator[currentIndex].devices[deviceType] = property_data.devices[deviceType].filter(element => element.unit == currentValue)
			}
			return accumulator // return array of unit objects - [{...}, {...}, ...]
	}, []),
	isLoading: false,
	searchType: '', // state.units or state.residents
	searchBy: 'default', // property of searchType to match, state.units.unit or state.residents.full_name
	value: '', // search value for searchBy property
	results: [], // returned search value matches
	selected: false // selected element from results
}

/* [ISSUE A]
i just re-read the exercise requirements,
seems i forgot about the admin devices so this is a late add in...
not clean but it'll work for this exercise...
**********/
const adminDevices = {}

for (let deviceType in property_data.devices) {
	adminDevices[deviceType] = property_data.devices[deviceType].filter((element, index) => element.admin_accessible)
}
/***********/

class Application extends React.Component {
	constructor(props) {
		super(props)

		this.state = { ...defaultState };
	}
	
  componentWillMount() {
    this.resetComponent()
  }	
	
	// method to return the app to a default state
	resetComponent = () => this.setState({ ...defaultState })

	// sets the search to state.searchType.searchBy - state.units.unit or state.residents.full name
	handleSearchTypeChange = (e, { value }) => {
		this.resetComponent()

		this.setState({ searchBy: value, searchType: value == 'full_name' ? 'residents' : 'units' })
	}		
	
	// return possible matches
  handleSearchChange = (e, { value }) => {
		this.setState({ isLoading: true, value })

    setTimeout(() => {
      this.setState({
        isLoading: false,
				results: this.state[this.state.searchType].filter(element => new RegExp(this.state.value, 'i').test(element[this.state.searchBy]))
      })
    }, 100)
  }
	
	// 'save' the this.state.searchBy property value that was found then selected by the user
	handleResultSelect = (e, result) => {
		// condition added here as a result of [ISSUE A]
		if (this.state.searchType == 'residents') {
			result.devices = this.state.units.filter(element => element.unit == result.unit)[0].devices
		} else {
			const modResidents = result.residents.map(element => {
				element.devices = this.state.units.filter(element => element.unit == result.unit)[0].devices
				
				return element
			})
			
			result.residents = modResidents
		}
		
		this.setState({ selected: result })
	}
	
	render() {
		const { property, isLoading, value, results, searchBy, searchType, selected } = this.state

		const dropDownOptions = [
			{ key: 'default', text: 'Search by...', value: 'default', disabled: true},
			{ key: 'full_name', text: 'People (residents)', value: 'full_name' },
			{ key: 'unit', text: 'Unit', value: 'unit' }
		]
		
		// component to display the search results to the user while they're searching
		const ResultsRenderer = props => <div>{props[searchBy]}</div>

		const ResidentCard = props => {
			return (
				<Card>
					<Card.Content>
						<Image floated='right' size='mini' src={ props.resident.avatar } />
						<Card.Header>{ props.resident.full_name }</Card.Header>
						<Card.Meta>
							<Label color='blue' horizontal>Unit { props.resident.unit }</Label>
							{props.resident.roles
								.map((element, index) => <Label color={ element == 'Admin' ? 'red' : 'orange' } horizontal>{ element }</Label>)}
						</Card.Meta>
						<Card.Description>
							{ props.resident.description }
							<Divider />
							{Object.keys(props.resident.devices).map((element, index) => <DeviceCard color='orange' type={ element } devices={ props.resident.devices[element] } />)}
							{props.resident.roles.indexOf('Admin') >= 0 &&
								<div>
									{Object.keys(adminDevices).map((element, index) => <DeviceCard color='red' type={ element } devices={ adminDevices[element] } />)}
								</div>
							}
						</Card.Description>
					</Card.Content>					
				</Card>			
			)
		}
		
		const DeviceCard = props => {
			return (
				<Card key={ props.type }>
					<Card.Content>	
						<Card.Header>{ props.type.charAt(0).toUpperCase() + props.type.slice(1) }</Card.Header>
						<Card.Description>
							{props.devices.length ? (
								<List divided selection>
									{props.devices.map(element => <List.Item><Label as='a' color={ props.color }>{element.model} - {element.unit}</Label></List.Item>)}
								</List>
							) : (
								<Label as='a' basic>none found</Label>
							)}
						</Card.Description>
					</Card.Content>	
				</Card>
			)
		}
		
		return (
			<Container>		
				<Segment raised>
					<Header as='h1'>
						<Header.Content>
							{ property.name }
							<Header.Subheader>
								{ property.address.address_line_1 } { property.address.city } { property.address.state } { property.address.zip }
							</Header.Subheader>
						</Header.Content>
					</Header>
					<Divider />
					<Form>
						<Form.Group inline>
							<Form.Field>
								<Dropdown
									button
									size='large'
									options={ dropDownOptions }
									onChange={ this.handleSearchTypeChange }
									value={ searchBy }
								/>						
							</Form.Field>
							<Form.Field>
								<Search
									loading={ isLoading }
									onResultSelect={ this.handleResultSelect }
									onSearchChange={ this.handleSearchChange }
									results={ results }
									value={ value }
									resultRenderer={ ResultsRenderer }
									disabled={ searchBy == 'default' }
									{ ...this.props }
								/>						
							</Form.Field>
							<Form.Field>
								{searchBy != 'default' &&
									<Icon name='cancel' size='large' onClick={ this.resetComponent } />
								}
							</Form.Field>
						</Form.Group>
					</Form>
				</Segment>
				{selected &&
					<Segment raised>
						<Label as='a' color='teal' ribbon='right'>Results { this.state.searchBy }</Label>
						{searchType == 'residents' ? (
							<ResidentCard resident={ selected } />
						) : (
							<div>
								<Header as='h4'>Devices</Header>
								<Card.Group>
									{Object.keys(selected.devices).map((element, index) => <DeviceCard type={ element } devices={ selected.devices[element] } />)}
								</Card.Group>
								<Header as='h4'>Residents</Header>
								<Card.Group>
									{selected.residents.map(element => (
										<ResidentCard resident={ element } />
									))}
								</Card.Group>
							</div>
						)}
					</Segment>
				}
			</Container>	
		)
	}
}

ReactDOM.render(
	<Application />,
	document.getElementById('app')
);