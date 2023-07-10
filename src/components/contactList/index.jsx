import React, { Component } from "react";
import css from "./contactList.module.css";

class ContactList extends Component {
  state = {
    filter: "",
    contacts:[]
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  saveContactsToLocalStorage = () => {
    const contacts = this.props.contacts;
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      const contacts = JSON.parse(savedContacts);
      this.setState({ contacts });
    }
  }

  componentDidUpdate() {
    this.saveContactsToLocalStorage();
  }

  getContacts = () => {
    const filter = this.state.filter;
    const contacts = this.props.contacts;

    if (filter.length === 0) {
      return contacts;
    }

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    return (
      <div>
        <div>
          <h2>Contacts</h2>
          <form className={css.form}>
            <div className={css.formInput}>
              <label htmlFor="Find contacts by name" className={css.inputLabel}>
                Find contacts by name
                <input
                  type="text"
                  name="filter"
                  placeholder="finding name"
                  value={this.state.filter}
                  onChange={this.handleChange}
                  className={css.formInput}
                />
              </label>
            </div>
          </form>
        </div>
        <ul>
          {this.getContacts().map(({ name, number, id }, index) => (
            <li key={id} className={css.contact}>
              {name} --- {number}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ContactList;
