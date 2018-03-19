(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', './assets/img/file.png', './assets/css/style.css'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('./assets/img/file.png'), require('./assets/css/style.css'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.file, global.style);
        global.index = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _file) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    var _file2 = _interopRequireDefault(_file);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var FileInput = function (_React$Component) {
        _inherits(FileInput, _React$Component);

        function FileInput(props) {
            _classCallCheck(this, FileInput);

            var _this = _possibleConstructorReturn(this, (FileInput.__proto__ || Object.getPrototypeOf(FileInput)).call(this, props));

            _this.handleFileUpload = function (e) {
                e.preventDefault();
                var target = e.target;

                if (_this.props.multiple) {
                    var files = _this.state.files;
                    Object.keys(target.files).map(function (key) {
                        files.push(target.files[key]);
                    });
                    _this.setState({
                        files: files
                    });
                    _this.props.onChange(files);
                } else {
                    var newFile = [];
                    newFile.push(target.files[0]);
                    _this.setState({
                        files: newFile
                    });
                    _this.props.onChange(newFile);
                }
            };

            _this.handleDeleteFile = function (index) {
                var files = _this.state.files;

                if (files.length === 1) {
                    files = [];
                } else {
                    delete files[index];
                }
                _this.setState({ files: files });
                _this.props.onChange(files);
            };

            _this.handleFileDrop = function (e) {
                e.preventDefault();
                e.stopPropagation();
                var files = e.dataTransfer.files;
                if (!_this.props.multiple) {
                    var newFile = [];
                    newFile.push(e.dataTransfer.files[0]);
                    _this.setState({
                        files: newFile
                    });
                    _this.props.onChange(newFile);
                } else {
                    var prevFile = _this.state.files;
                    Object.keys(files).map(function (key) {
                        prevFile.push(files[key]);
                    });
                    _this.setState({ files: prevFile });
                    _this.props.onChange(prevFile);
                }
                return false;
            };

            _this.state = {
                files: []
            };
            _this.handleFileSelect = _this.handleFileSelect.bind(_this);
            // this.handleFileUpload=this.handleFileUpload.bind(this)

            return _this;
        }

        _createClass(FileInput, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                window.addEventListener('drop', this.handleFileUpload);
                window.addEventListener('dragover', this.handleFileUpload);
                document.getElementById('drop').addEventListener('drop', this.handleFileUpload);
            }
        }, {
            key: 'handleFileSelect',
            value: function handleFileSelect() {
                this.refs.fileUploader.click();
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var files = this.state.files;

                var fileList = this.state.files && Object.keys(files).map(function (key) {
                    return _react2.default.createElement(
                        'li',
                        { key: key },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement('img', { src: _file2.default, alt: files[key].name, id: 'file' }),
                            _react2.default.createElement(
                                'p',
                                { className: 'file-type' },
                                files[key].type
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'file-name' },
                                files[key].name
                            ),
                            _react2.default.createElement('span', { onClick: function onClick() {
                                    _this2.handleDeleteFile(key);
                                } })
                        )
                    );
                });

                return _react2.default.createElement(
                    'form',
                    { id: 'upload' },
                    _react2.default.createElement(
                        'div',
                        { id: 'drop', onDrop: this.handleFileDrop, onDragOver: this.handleFileDrop },
                        'Drop Here',
                        _react2.default.createElement(
                            'a',
                            { onClick: this.handleFileSelect },
                            'Browse'
                        ),
                        _react2.default.createElement('input', { type: 'file', ref: 'fileUploader', accept: this.props.accept, onChange: this.handleFileUpload, multiple: this.props.multiple ? true : false, name: 'upl' })
                    ),
                    _react2.default.createElement(
                        'ul',
                        null,
                        fileList
                    )
                );
            }
        }]);

        return FileInput;
    }(_react2.default.Component);

    FileInput.propTypes = {
        multiple: _propTypes2.default.bool,
        accept: _propTypes2.default.string,
        onChange: _propTypes2.default.func.isRequired

    };

    exports.default = FileInput;
});
