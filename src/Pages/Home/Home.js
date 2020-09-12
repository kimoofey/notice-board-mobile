import React, {Component} from 'react';
import {Button, Text, TouchableHighlight, View} from "react-native";
// import images from '../../ProjectImages/ProjectImages';

export default class HomePage extends Component {
    static navigationOptions = {
        title: 'Chatter',
    };

    state = {
        name: '',
    };

    onPress = () =>
        this.props.navigation.navigate('Chat', {name: this.state.name});

    render() {
        return (
            <View>
                <View className="splash-container">
                    <View className="splash">
                        <Text className="splash-head">WEB CHAT APP</Text>
                        <Text className="splash-subhead">
                            Let's talk with our loved ones
                        </Text>

                        <View id="custom-button-wrapper">
                            <TouchableHighlight onPress={() => alert('Pressed!')}>
                                <Button
                                    title="Click to log in"
                                    onPress={() => this.props.navigation.navigate('LogIn')}
                                />
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>

                {/*<div className="content-wrapper">*/}
                {/*    <div className="content">*/}
                {/*        <h2 className="content-head is-center"> Features of WebChat Application</h2>*/}


                {/*        <div className="Appfeatures">*/}
                {/*            <div className="contenthead">*/}

                {/*                <h3 className="content-subhead">*/}
                {/*                    <i className="fa fa-rocket"></i>*/}
                {/*                    Get Started Quickly*/}
                {/*                </h3>*/}
                {/*                <p>*/}
                {/*                    Just register yourself with this app and start chating with your loved ones*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">*/}
                {/*                <h3 className="content-subhead">*/}
                {/*                    <i className="fa fa-sign-in"></i>*/}
                {/*                    Firebase Authentication*/}
                {/*                </h3>*/}
                {/*                <p>*/}
                {/*                    Firebase Authentication has been implemented in this app*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">*/}
                {/*                <h3 className="content-subhead">*/}
                {/*                    <i className="fa fa-th-large"></i>*/}
                {/*                    Media*/}
                {/*                </h3>*/}
                {/*                <p>*/}
                {/*                    You can share images with your friends for better experience*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">*/}
                {/*                <h3 className="content-subhead">*/}
                {/*                    <i className="fa fa-refresh"></i>*/}
                {/*                    Updates*/}
                {/*                </h3>*/}
                {/*                <p>*/}
                {/*                    We will working with new features for this app for better experience in future*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className="AppfeaturesFounder">*/}
                {/*        <div className="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">*/}
                {/*            /!*<img width="300" alt="File Icons" className="pure-img-responsive" src={images.ali}/>*!/*/}
                {/*        </div>*/}
                {/*        <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">*/}

                {/*            <h2 className="content-head content-head-ribbon">Muhammad Ali</h2>*/}

                {/*            <p style={{color: 'white'}}>*/}
                {/*                The Founder of Coding Cafe.*/}
                {/*            </p>*/}
                {/*            <p style={{color: 'white'}}>*/}
                {/*                Currently working at Coding Cafe and busy to explore new ideas with new technologies*/}
                {/*                being developed*/}
                {/*            </p>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className="content">*/}
                {/*        <h2 className="content-head is-center">Who We Are?</h2>*/}

                {/*        <div className="Appfeatures">*/}
                {/*            <div className="l-box-lrg pure-u-1 pure-u-md-2-5">*/}
                {/*                <form className="pure-form pure-form-stacked">*/}
                {/*                    <fieldset>*/}

                {/*                        <label htmlFor="name">Your Name</label>*/}
                {/*                        <input id="name" type="text" placeholder="Your Name"/>*/}


                {/*                        <label htmlFor="email">Your Email</label>*/}
                {/*                        <input id="email" type="email" placeholder="Your Email"/>*/}

                {/*                        <label htmlFor="password">Your Password</label>*/}
                {/*                        <input id="password" type="password" placeholder="Your Password"/>*/}

                {/*                        <button type="submit" className="pure-button">Sign Up</button>*/}
                {/*                    </fieldset>*/}
                {/*                </form>*/}
                {/*            </div>*/}

                {/*            <div className="l-box-lrg pure-u-1 pure-u-md-3-5">*/}
                {/*                <h4>Contact Us</h4>*/}
                {/*                <p>*/}
                {/*                    For any question or suggestion you can directly contact us on our Facebook Page:*/}
                {/*                    <a href=" https://web.facebook.com/programming438/"> https://web.facebook.com/programming438/</a>*/}
                {/*                </p>*/}
                {/*                <p>*/}
                {/*                    Twitter:<a href="https://twitter.com/alizeb438">https://twitter.com/alizeb438</a>*/}
                {/*                </p>*/}
                {/*                <p>*/}
                {/*                    Facebook: <a*/}
                {/*                    href="https://web.facebook.com/alizeb438 ">https://web.facebook.com/alizeb438 </a>*/}
                {/*                </p>*/}
                {/*                <p>*/}
                {/*                    Instagram:<a*/}
                {/*                    href=" https://www.instagram.com/alizeb438/"> https://www.instagram.com/alizeb438/</a>*/}
                {/*                </p>*/}


                {/*                <h4>More Information</h4>*/}
                {/*                <p>*/}
                {/*                    To whom it may concern*/}

                {/*                </p>*/}
                {/*                <p>*/}
                {/*                    This App is developed for learning purpose -*/}
                {/*                    Developed by -Muhammad Ali -Muhammad Haris*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <Footer/>*/}
                {/*</div>*/}
            </View>
        );
    }
}
