import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const AddressList  = () => {
    return (
        <div>
            <ul>
                <li>one</li>
                <li>two</li>
                <li>three</li>
            </ul>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        addresses : state.addresses
    }
}

export default connect(mapStateToProps)(AddressList)