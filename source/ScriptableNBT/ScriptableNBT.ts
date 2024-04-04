// Copyright (c) 2022-2024 CuiZhenhang (github.com/CuiZhenhang)

LIBRARY({
    name: 'ScriptableNBT',
    version: 2,
    api: 'CoreEngine',
    shared: true
})

namespace ScriptableNBT {

    export interface INBTValue<T> {
        /**
         * NBT data type
         */
        readonly type: ENbtDataType
        /**
         * Get the Scriptable NBT data
         */
        get value(): Nullable<T>
        /**
         * Set the Scriptable NBT data.\
         * With automatic check for type and range.
         */
        set value(value: Nullable<T>)
        /**
         * Set the Scriptable NBT data from compound tag.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         * @param compoundTag source compound tag
         * @param key for the specified key
         */
        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void
        /**
         * Apply the Scriptable NBT data to compound tag
         * @param compoundTag target compound tag
         * @param key for the specified key
         */
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void
        /**
         * Set the Scriptable NBT data from list tag.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         * @param listTag source list tag
         * @param index for the specified index
         */
        fromListTag(listTag: NBT.ListTag, index: number): void
        /**
         * Apply the Scriptable NBT data to list tag
         * @param listTag target list tag
         * @param index for the specified index
         */
        applyToListTag(listTag: NBT.ListTag, index: number): void
    }

    export class NBTByteValue implements INBTValue<number> {
        readonly type = ENbtDataType.TYPE_BYTE

        private static readonly MIN = -128
        private static readonly MAX = 127
        private _value: Nullable<number> = null

        constructor(value: Nullable<number> = null) {
            this.value = value
        }

        get value(): Nullable<number> {
            return this._value
        }
        set value(value: Nullable<number | boolean>) {
            if (value == null) {
                this._value = null
                return
            }
            if (typeof value === 'boolean') value = +value
            if (typeof value !== 'number') return
            if (value % 1) value = Math.floor(value)
            if (value < NBTByteValue.MIN) value = NBTByteValue.MIN
            if (value > NBTByteValue.MAX) value = NBTByteValue.MAX
            this._value = value
        }

        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null
                return
            }
            this.value = compoundTag.getByte(key)
        }
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            if (this.value == null) {
                compoundTag.remove(key)
                return
            }
            compoundTag.putByte(key, this.value)
        }

        fromListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null
                return
            }
            this.value = listTag.getByte(index)
        }
        applyToListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index % 1 !== 0) return
            if (this.value == null) return
            listTag.putByte(index, this.value)
        }
    }

    export class NBTShortValue implements INBTValue<number> {
        readonly type = ENbtDataType.TYPE_SHORT

        private static readonly MIN = -32768
        private static readonly MAX = 32767
        private _value: Nullable<number> = null

        constructor(value: Nullable<number> = null) {
            this.value = value
        }

        get value() {
            return this._value
        }
        set value(value: Nullable<number>) {
            if (value == null) {
                this._value = null
                return
            }
            if (typeof value !== 'number') return
            if (value % 1) value = Math.floor(value)
            if (value < NBTShortValue.MIN) value = NBTShortValue.MIN
            if (value > NBTShortValue.MAX) value = NBTShortValue.MAX
            this._value = value
        }

        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null
                return
            }
            this.value = compoundTag.getShort(key)
        }
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            if (this.value == null) {
                compoundTag.remove(key)
                return
            }
            compoundTag.putShort(key, this.value)
        }

        fromListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null
                return
            }
            this.value = listTag.getShort(index)
        }
        applyToListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index % 1 !== 0) return
            if (this.value == null) return
            listTag.putShort(index, this.value)
        }
    }

    export class NBTIntValue implements INBTValue<number> {
        readonly type = ENbtDataType.TYPE_INT

        private static readonly MIN = -2147483648
        private static readonly MAX = 2147483647
        private _value: Nullable<number> = null

        constructor(value: Nullable<number> = null) {
            this.value = value
        }

        get value() {
            return this._value
        }
        set value(value: Nullable<number>) {
            if (value == null) {
                this._value = null
                return
            }
            if (typeof value !== 'number') return
            if (value % 1) value = Math.floor(value)
            if (value < NBTIntValue.MIN) value = NBTIntValue.MIN
            if (value > NBTIntValue.MAX) value = NBTIntValue.MAX
            this._value = value
        }

        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null
                return
            }
            this.value = compoundTag.getInt(key)
        }
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            if (this.value == null) {
                compoundTag.remove(key)
                return
            }
            compoundTag.putInt(key, this.value)
        }

        fromListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null
                return
            }
            this.value = listTag.getInt(index)
        }
        applyToListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index % 1 !== 0) return
            if (this.value == null) return
            listTag.putInt(index, this.value)
        }
    }

    export class NBTInt64Value implements INBTValue<number | java.lang.Long> {
        readonly type = ENbtDataType.TYPE_INT64

        private static readonly MIN = -9223372036854775808 // not a safe integer
        private static readonly MAX = 9223372036854775807 // not a safe integer
        private _value: Nullable<number | java.lang.Long> = null

        constructor(value: Nullable<number | java.lang.Long> = null) {
            this.value = value
        }

        get value(): Nullable<number> {
            if (this._value == null) return null
            // @ts-ignore
            if (this._value.getClass) {
                return (this._value as java.lang.Long).longValue()
            } else {
                return this._value as number
            }
        }
        set value(value: Nullable<number | java.lang.Long>) {
            if (value == null) {
                this._value = null
                return
            }
            // @ts-ignore
            if (value.getClass) {
                this._value = value as java.lang.Long
            } else {
                if (typeof value !== 'number') return
                if (value % 1) value = Math.floor(value)
                if (value < NBTInt64Value.MIN) value = NBTInt64Value.MIN
                if (value > NBTInt64Value.MAX) value = NBTInt64Value.MAX
                this._value = value
            }
        }

        /**
         * Get the Scriptable NBT data as [[java.lang.Long]]
         */
        get longValue(): Nullable<java.lang.Long> {
            if (this._value == null) return null
            // @ts-ignore
            if (this._value.getClass) {
                return this._value as java.lang.Long
            } else {
                return java.lang.Long.valueOf(this._value as number)
            }
        }

        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null
                return
            }
            this.value = compoundTag.getInt64(key)
        }
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            if (this.value == null) {
                compoundTag.remove(key)
                return
            }
            compoundTag.putInt64(key, this.value)
        }

        fromListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null
                return
            }
            this.value = listTag.getInt64(index)
        }
        applyToListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index % 1 !== 0) return
            if (this.value == null) return
            listTag.putInt64(index, this.value)
        }
    }

    export class NBTFloatValue implements INBTValue<number> {
        readonly type = ENbtDataType.TYPE_FLOAT

        private _value: Nullable<number> = null

        constructor(value: Nullable<number> = null) {
            this.value = value
        }

        get value() {
            return this._value
        }
        set value(value: Nullable<number>) {
            if (value == null) {
                this._value = null
                return
            }
            if (typeof value !== 'number') return
            this._value = value
        }

        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null
                return
            }
            this.value = compoundTag.getFloat(key)
        }
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            if (this.value == null) {
                compoundTag.remove(key)
                return
            }
            compoundTag.putFloat(key, this.value)
        }

        fromListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null
                return
            }
            this.value = listTag.getFloat(index)
        }
        applyToListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index % 1 !== 0) return
            if (this.value == null) return
            listTag.putFloat(index, this.value)
        }
    }

    export class NBTDoubleValue implements INBTValue<number> {
        readonly type = ENbtDataType.TYPE_DOUBLE

        private _value: Nullable<number> = null

        constructor(value: Nullable<number> = null) {
            this.value = value
        }

        get value() {
            return this._value
        }
        set value(value: Nullable<number>) {
            if (value == null) {
                this._value = null
                return
            }
            if (typeof value !== 'number') return
            this._value = value
        }

        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null
                return
            }
            this.value = compoundTag.getDouble(key)
        }
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            if (this.value == null) {
                compoundTag.remove(key)
                return
            }
            compoundTag.putDouble(key, this.value)
        }

        fromListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null
                return
            }
            this.value = listTag.getDouble(index)
        }
        applyToListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index % 1 !== 0) return
            if (this.value == null) return
            listTag.putDouble(index, this.value)
        }
    }

    export class NBTStringValue implements INBTValue<string> {
        readonly type = ENbtDataType.TYPE_STRING

        private _value: Nullable<string> = null

        constructor(value: Nullable<string> = null) {
            this.value = value
        }

        get value() {
            return this._value
        }
        set value(value: Nullable<string>) {
            if (value == null) {
                this._value = null
                return
            }
            this._value = String(value)
        }

        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null
                return
            }
            this.value = compoundTag.getString(key)
        }
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            if (this.value == null) {
                compoundTag.remove(key)
                return
            }
            compoundTag.putString(key, this.value)
        }

        fromListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null
                return
            }
            this.value = listTag.getString(index)
        }
        applyToListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index % 1 !== 0) return
            if (this.value == null) return
            listTag.putString(index, this.value)
        }
    }

    export class NBTListValue implements INBTValue<Array<INBTValue<any>> | NBT.ListTag> {
        readonly type = ENbtDataType.TYPE_LIST

        private _value: Nullable<Array<INBTValue<any>> | NBT.ListTag> = null

        constructor(value: Nullable<Array<INBTValue<any>> | NBT.ListTag> = null) {
            this.value = value
        }

        /**
         * Get the Scriptable NBT data.\
         * **Attention**, the operation `get` will create a instance for each of its child elements,
         * which could lead to a performance issue if unproperly used.\
         * Consider using `NBTListValue.get` instead.
         */
        get value(): Nullable<Array<INBTValue<any>>> {
            if (this._value == null) return null
            // @ts-ignore
            if (this._value.getClass) {
                let listTag = this._value as NBT.ListTag
                this._value = []
                let length = listTag.length()
                for (let index = 0; index < length; ++index) {
                    let type = listTag.getValueType(index)
                    let temp = NBTValueFactory.createNBTValue(type)
                    if (!temp) {
                        if (type) Logger.Log(`ScriptableNBT: Unknown NBT type in listTag. (type number is ${ type })`, 'WARN')
                        continue
                    }
                    temp.fromListTag(listTag, index)
                    this._value[index] = temp
                }
            }
            return this._value as Array<INBTValue<any>>
        }
        set value(value: Nullable<Array<INBTValue<any>> | NBT.ListTag>) {
            if (value == null) {
                this._value = null
                return
            }
            // @ts-ignore
            if (value.getClass) {
                this._value = value as NBT.ListTag
            } else {
                if (!Array.isArray(value)) return
                this._value = value
            }
        }

        /**
         * Get NBT value of specified index as Scriptable NBT data
         * @param index the specified index
         * @returns Scriptable NBT data if specified index exists in list tag. Otherwise is null.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         */
        get(index: number): Nullable<INBTValue<any>> {
            if (this._value == null) return null
            if (index < 0) return null
            // @ts-ignore
            if (this._value.getClass) {
                let listTag = this._value as NBT.ListTag
                if (index >= listTag.length() || index % 1 !== 0) return null
                let type = listTag.getValueType(index)
                let temp = NBTValueFactory.createNBTValue(type)
                if (!temp) {
                    if (type) Logger.Log(`ScriptableNBT: Unknown NBT type in listTag. (type number is ${ type })`, 'WARN')
                    return null
                }
                temp.fromListTag(listTag, index)
                return temp || null
            } else {
                return this._value[index]
            }
        }

        /**
         * Get the Scriptable NBT data as [[NBT.ListTag]]. It's a clone.
         */
        get listTag(): Nullable<NBT.ListTag> {
            if (this._value == null) return null
            // @ts-ignore
            if (this._value.getClass) {
                // @ts-ignore
                return new NBT.ListTag(this._value as NBT.ListTag)
            } else {
                let listTag = new NBT.ListTag()
                let value = this._value as INBTValue<any>[]
                for (let index = 0; index < value.length; ++index) {
                    if (value[index]) {
                        value[index].applyToListTag(listTag, index)
                    }
                }
                return listTag
            }
        }

        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null
                return
            }
            this.value = compoundTag.getListTagNoClone(key)
        }
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            let value = this.listTag
            if (value == null) {
                compoundTag.remove(key)
                return
            }
            compoundTag.putListTag(key, value)
        }

        fromListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null
                return
            }
            this.value = listTag.getListTagNoClone(index)
        }
        applyToListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index % 1 !== 0) return
            let value = this.listTag
            if (value == null) return
            listTag.putListTag(index, value)
        }
    }

    export class NBTCompoundValue implements INBTValue<{[key: string]: INBTValue<any>} | NBT.CompoundTag> {
        readonly type = ENbtDataType.TYPE_COMPOUND

        private _value: Nullable<{[key: string]: INBTValue<any>} | NBT.CompoundTag> = null

        constructor(value: Nullable<{[key: string]: INBTValue<any>} | NBT.CompoundTag> = null) {
            this.value = value
        }

        /**
         * Get the Scriptable NBT data.\
         * **Attention**, the operation `get` will create a instance for each of its child elements,
         * which could lead to a performance issue if unproperly used.\
         * Consider using `NBTCompoundValue.get` instead.
         */
        get value(): Nullable<{[key: string]: INBTValue<any>}> {
            if (this._value == null) return null
            // @ts-ignore
            if (this._value.getClass) {
                let compoundTag = this._value as NBT.CompoundTag
                this._value = {}
                let keys = compoundTag.getAllKeys()
                for (let index = 0; index < keys.length; ++index) {
                    let key = String(keys[index])
                    let type = compoundTag.getValueType(key)
                    let temp = NBTValueFactory.createNBTValue(type)
                    if (!temp) {
                        if (type) Logger.Log(`ScriptableNBT: Unknown NBT type in compoundTag. (type number is ${ type })`, 'WARN')
                        continue
                    }
                    temp.fromCompoundTag(compoundTag, key)
                    this._value[key] = temp
                }
            }
            return this._value as {[key: string]: INBTValue<any>}
        }
        set value(value: Nullable<{[key: string]: INBTValue<any>} | NBT.CompoundTag>) {
            if (value == null) {
                this._value = null
                return
            }
            // @ts-ignore
            if (value.getClass) {
                this._value = value as NBT.CompoundTag
            } else {
                if (typeof value !== 'object') return
                this._value = value as {[key: string]: INBTValue<any>}
            }
        }

        /**
         * Get NBT value of specified key as Scriptable NBT data
         * @param key the specified key
         * @returns Scriptable NBT data if specified key exists in compound tag. Otherwise is null.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         */
        get(key: string): Nullable<INBTValue<any>> {
            if (this._value == null) return null
            // @ts-ignore
            if (this._value.getClass) {
                let compoundTag = this._value as NBT.CompoundTag
                if (!compoundTag.contains(key)) return null
                let type = compoundTag.getValueType(key)
                let temp = NBTValueFactory.createNBTValue(type)
                if (!temp) {
                    if (type) Logger.Log(`ScriptableNBT: Unknown NBT type in compoundTag. (type number is ${ type })`, 'WARN')
                    return null
                }
                temp.fromCompoundTag(compoundTag, key)
                return temp
            }
            return this._value[key] || null
        }

        /**
         * Get the Scriptable NBT data as [[NBT.CompoundTag]]. It's a clone.
         */
        get compoundTag(): Nullable<NBT.CompoundTag> {
            if (this._value == null) return null
            // @ts-ignore
            if (this._value.getClass) {
                return new NBT.CompoundTag(this._value as NBT.CompoundTag)
            } else {
                let compoundTag = new NBT.CompoundTag()
                let value = this._value as {[key: string]: INBTValue<any>}
                for (let key in value) {
                    if (value[key]) {
                        value[key].applyToCompoundTag(compoundTag, key)
                    }
                }
                return compoundTag
            }
        }
        /**
         * Get the Scriptable NBT data as [[NBT.CompoundTag]]. It's a reference.\
         * If the type of inner value is not [[NBT.CompoundTag]], null is returned.
         */
        get refCompoundTag(): Nullable<NBT.CompoundTag> {
            if (this._value == null) return null
            // @ts-ignore
            if (this._value.getClass) {
                return this._value as NBT.CompoundTag
            }
            return null
        }

        fromCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            if (!compoundTag.containsValueOfType(key, this.type)) {
                this.value = null
                return
            }
            this.value = compoundTag.getCompoundTagNoClone(key)
        }
        applyToCompoundTag(compoundTag: NBT.CompoundTag, key: string): void {
            let value = this.compoundTag
            if (value == null) {
                compoundTag.remove(key)
                return
            }
            compoundTag.putCompoundTag(key, value)
        }

        fromListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) {
                this.value = null
                return
            }
            this.value = listTag.getCompoundTagNoClone(index)
        }
        applyToListTag(listTag: NBT.ListTag, index: number): void {
            if (index < 0 || index % 1 !== 0) return
            let value = this.compoundTag
            if (value == null) return
            listTag.putCompoundTag(index, value)
        }
    }

    export type JsonListTag = Array<{
        t: ENbtDataType,
        v: any
    }>
    export type JsonCompoundTag = {
        [key: string]: {
            t: ENbtDataType,
            v: any
        }
    }

    export class NBTValueFactory {
        /**
         * create Scriptable NBT data of specified NBT data type
         * @param type NBT data type
         * @param value NBT value or Scriptable data. Default is null.
         * @returns Scriptable NBT data if the NBT data type is implemented. Otherwise is null.
         */
        static createNBTValue(type: ENbtDataType.TYPE_BYTE, value?: Nullable<number>): NBTByteValue
        static createNBTValue(type: ENbtDataType.TYPE_SHORT, value?: Nullable<number>): NBTShortValue
        static createNBTValue(type: ENbtDataType.TYPE_INT, value?: Nullable<number>): NBTIntValue
        static createNBTValue(type: ENbtDataType.TYPE_INT64, value?: Nullable<number | java.lang.Long>): NBTInt64Value
        static createNBTValue(type: ENbtDataType.TYPE_FLOAT, value?: Nullable<number>): NBTFloatValue
        static createNBTValue(type: ENbtDataType.TYPE_DOUBLE, value?: Nullable<number>): NBTDoubleValue
        static createNBTValue(type: ENbtDataType.TYPE_STRING, value?: Nullable<string>): NBTStringValue
        static createNBTValue(type: ENbtDataType.TYPE_LIST, value?: Nullable<Array<INBTValue<any>> | NBT.ListTag>): NBTListValue
        static createNBTValue(type: ENbtDataType.TYPE_COMPOUND, value?: Nullable<{[key: string]: INBTValue<any>} | NBT.CompoundTag>): NBTCompoundValue
        static createNBTValue(type: ENbtDataType, value?: any): Nullable<INBTValue<any>>
        static createNBTValue(type: ENbtDataType, value?: any) {
            switch (type) {
                case ENbtDataType.TYPE_BYTE: return new NBTByteValue(value)
                case ENbtDataType.TYPE_SHORT: return new NBTShortValue(value)
                case ENbtDataType.TYPE_INT: return new NBTIntValue(value)
                case ENbtDataType.TYPE_INT64: return new NBTInt64Value(value)
                case ENbtDataType.TYPE_FLOAT: return new NBTFloatValue(value)
                case ENbtDataType.TYPE_DOUBLE: return new NBTDoubleValue(value)
                case ENbtDataType.TYPE_STRING: return new NBTStringValue(value)
                case ENbtDataType.TYPE_LIST: return new NBTListValue(value)
                case ENbtDataType.TYPE_COMPOUND: return new NBTCompoundValue(value)
            }
            return null
        }

        /**
         * Get NBT value of specified key as Scriptable NBT data
         * @param compoundTag source compound tag
         * @param key the specified key
         * @returns Scriptable NBT data if specified key exists in compound tag. Otherwise is null.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         */
        static getCompoundTagValue(compoundTag: NBT.CompoundTag, key: string): Nullable<INBTValue<any>> {
            if (!compoundTag.contains(key)) return null
            let type = compoundTag.getValueType(key)
            let value = NBTValueFactory.createNBTValue(type)
            if (!value) {
                if (type) Logger.Log(`ScriptableNBT: Unknown NBT type in compoundTag. (type number is ${ type })`, 'WARN')
                return null
            }
            value.fromCompoundTag(compoundTag, key)
            return value
        }
        /**
         * Get NBT value of specified index as Scriptable NBT data
         * @param listTag source list tag
         * @param index the specified index
         * @returns Scriptable NBT data if specified index exists in list tag. Otherwise is null.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         */
        static getListTagValue(listTag: NBT.ListTag, index: number): Nullable<INBTValue<any>> {
            if (index < 0 || index >= listTag.length() || index % 1 !== 0) return null
            let type = listTag.getValueType(index)
            let value = NBTValueFactory.createNBTValue(type)
            if (!value) {
                if (type) Logger.Log(`ScriptableNBT: Unknown NBT type in listTag. (type number is ${ type })`, 'WARN')
                return null
            }
            value.fromListTag(listTag, index)
            return value
        }

        /**
         * Get NBT of specified keys and indexes
         * @param tag source compound tag or list tag
         * @param args the specified keys and indexes
         * @returns a reference to the compound tag or list tag
         */
        static getTag(tag: NBT.CompoundTag | NBT.ListTag, ...args: Array<string | number>): Nullable<NBT.CompoundTag | NBT.ListTag> {
            for (let key of args) {
                if (typeof key === 'string') {
                    // @ts-ignore
                    if (!tag.getClass || !tag.contains) return null
                    tag = <NBT.CompoundTag> tag
                    if (!tag.contains(key)) return null
                    let type = tag.getValueType(key)
                    if (type === ENbtDataType.TYPE_COMPOUND) tag = tag.getCompoundTagNoClone(key)
                    else if (type === ENbtDataType.TYPE_LIST) tag = tag.getListTagNoClone(key)
                    else return null
                } else if (typeof key === 'number') {
                    // @ts-ignore
                    if (!tag.getClass || !tag.length) return null
                    tag = <NBT.ListTag> tag
                    if (key < 0 || key >= tag.length() || key % 1 !== 0) return null
                    let type = tag.getValueType(key)
                    if (type === ENbtDataType.TYPE_COMPOUND) tag = tag.getCompoundTagNoClone(key)
                    else if (type === ENbtDataType.TYPE_LIST) tag = tag.getListTagNoClone(key)
                    else return null
                } else {
                    return null
                }
            }
            return tag
        }

        /**
         * Get NBT value of specified keys and indexes as Scriptable NBT data
         * @param tag source compound tag or list tag
         * @param args the specified keys and indexes. Should not be empty.
         * @returns Scriptable NBT data if specified index exists in list tag.\
         * If this is instance of `NBTListValue` or `NBTCompoundValue`, it's a reference but not a clone.
         */
        static getTagValue(tag: NBT.CompoundTag | NBT.ListTag, ...args: Array<string | number>): Nullable<INBTValue<any>> {
            if (!args.length) return null
            let lastKey = args[args.length - 1]
            args.pop()
            let temp = this.getTag(tag, ...args)
            if (!temp) return null
            if (typeof lastKey === 'string') {
                // @ts-ignore
                if (!temp.getClass || !temp.contains) return null
                return this.getCompoundTagValue(<NBT.CompoundTag> temp, lastKey)
            } else if (typeof lastKey === 'number') {
                // @ts-ignore
                if (!temp.getClass || !temp.length) return null
                return this.getListTagValue(<NBT.ListTag> temp, lastKey)
            } else {
                return null
            }
        }
        /**
         * Set NBT value of specified keys and indexes by Scriptable NBT data
         * @param tag source compound tag or list tag
         * @param value Scriptable NBT data
         * @param args the specified keys and indexes. Should not be empty.
         */
        static setTagValue(tag: NBT.CompoundTag | NBT.ListTag, value: INBTValue<any>, ...args: Array<string | number>): void {
            if (!args.length) return
            let lastKey = args[args.length - 1]
            args.pop()
            let temp = this.getTag(tag, ...args)
            if (!temp) return
            if (typeof lastKey === 'string') {
                // @ts-ignore
                if (!temp.getClass || !temp.contains) return
                value.applyToCompoundTag(<NBT.CompoundTag> temp, lastKey)
            } else if (typeof lastKey === 'number') {
                // @ts-ignore
                if (!temp.getClass || !temp.length) return
                value.applyToListTag(<NBT.ListTag> temp, lastKey)
            }
        }

        /**
         * Parse the [[JsonListTag]] or [[JsonCompoundTag]] into Scriptable NBT data
         * @param json [[JsonListTag]] or [[JsonCompoundTag]]
         */
        static parseJson(json: JsonListTag): Nullable<NBTListValue>
        static parseJson(json: JsonCompoundTag): Nullable<NBTCompoundValue>
        static parseJson(json: JsonListTag | JsonCompoundTag): Nullable<NBTListValue> | Nullable<NBTCompoundValue> {
            if (Array.isArray(json)) {
                // @ts-ignore
                let array : Array<INBTValue<any>> = json.map(function (obj) {
                    if (obj.t === ENbtDataType.TYPE_LIST || obj.t === ENbtDataType.TYPE_COMPOUND) {
                        return NBTValueFactory.parseJson(obj.v)
                    } else {
                        return NBTValueFactory.createNBTValue(obj.t, obj.v)
                    }
                })
                return NBTValueFactory.createNBTValue(ENbtDataType.TYPE_LIST, array)
            } else {
                let object : {[key: string]: INBTValue<any>} = {}
                for (let key in json) {
                    let obj = json[key]
                    if (obj.t === ENbtDataType.TYPE_LIST || obj.t === ENbtDataType.TYPE_COMPOUND) {
                        // @ts-ignore
                        object[key] = NBTValueFactory.parseJson(obj.v)
                    } else {
                        // @ts-ignore
                        object[key] = NBTValueFactory.createNBTValue(obj.t, obj.v)
                    }
                }
                return NBTValueFactory.createNBTValue(ENbtDataType.TYPE_COMPOUND, object)
            }
        }

        /**
         * Get the [[JsonListTag]] or [[JsonCompoundTag]] of Scriptable NBT data
         * @param value Scriptable NBT data. Should be [[NBTListValue]] or [[NBTCompoundValue]].
         */
        static toJson(value: NBTListValue): JsonListTag
        static toJson(value: NBTCompoundValue): JsonCompoundTag
        static toJson(value: NBTListValue | NBTCompoundValue) {
            if (value.type === ENbtDataType.TYPE_LIST) {
                let json : JsonListTag = value.value?.map(function (child) {
                    if (!child) return { t: 0, v: null }
                    if (child.type === ENbtDataType.TYPE_LIST) {
                        return {
                            t: child.type,
                            v: NBTValueFactory.toJson(child as NBTListValue)
                        }
                    } else if (child.type === ENbtDataType.TYPE_COMPOUND) {
                        return {
                            t: child.type,
                            v: NBTValueFactory.toJson(child as NBTCompoundValue)
                        }
                    } else {
                        return {
                            t: child.type,
                            v: child.value
                        }
                    }
                }) || []
                return json
            } else {
                let json : JsonCompoundTag = {}
                if (value.value) {
                    for (let key in value.value) {
                        let child = value.value[key]
                        if (!child) continue
                        if (child.type === ENbtDataType.TYPE_LIST) {
                            json[key] = {
                                t: child.type,
                                v: NBTValueFactory.toJson(child as NBTListValue)
                            }
                        } else if (child.type === ENbtDataType.TYPE_COMPOUND) {
                            json[key] = {
                                t: child.type,
                                v: NBTValueFactory.toJson(child as NBTCompoundValue)
                            }
                        } else {
                            json[key] = {
                                t: child.type,
                                v: child.value
                            }
                        }
                    }
                }
                return json
            }
        }
    }
}

EXPORT('ScriptableNBT', ScriptableNBT)
