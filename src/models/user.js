const bcrypt = require('bcrypt')

const logger = require('../../winston-config')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    first_name: {
      type: DataTypes.STRING(50),
      defaultValue: ''
    },
    last_name: {
      type: DataTypes.STRING(50),
      defaultValue: ''
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  /**
   * beforeCreate hook on User instance to hash the password
   */
  User.addHook('beforeCreate', async (user, options) => {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT))
    user.password = await bcrypt.hash(user.password, salt)
  })

  /**
   * Checks whether user with same unique fiels already exist or not
   * @returns User object on success and null if not found
   */
  User.findOneUser = function (email, cb) {
    this.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          return cb(null, null)
        }
        return cb(null, user)
      })
      .catch((err) => {
        logger.error(`DB Error: ${err.message}`)
        return cb(err)
      })
  }
  return User
}
