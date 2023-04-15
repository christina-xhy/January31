import { useState, useRef, useEffect } from 'react'
import { time } from '../lib/time'

type itemProps = {
      start?: Date
      end?: Date
      value?: Date
      onCancel?: () => void
      onConfirm?: (value: Date) => void
}

const getNow = () => time().set({ hours: 0, minutes: 0, seconds: 0, ms: 0 })
export const DatePickers: React.FC<itemProps> = (props) => {
      const { start, end, value, onCancel, onConfirm } = props
      const startTime = start ? time(start) : getNow().add(-10, 'years')
      const endTime = end ? time(end) : getNow().add(10, 'years')
      const valueTime = useRef(value ? time(value) : getNow())
      if (endTime.timesStamp <= startTime.timesStamp) {
            throw new Error('结束时间不能小于开始时间')
      }
      const yearList = Array.from({ length: endTime.year - startTime.year + 1 }).map(
            (_, index) => startTime.year + index
      )
      const monthList = Array.from({ length: 12 }).map((_, index) => index + 1)
      const dayList = Array.from({ length: valueTime.current.lastDayOfMonth.day }).map(
            (_, index) => index + 1
      )
      const [_, update] = useState({})
      return (
            <div>
                  <div flex justify-between p-16px border-b-1 b='#f3f3f3' overflow-hidden
                        children-p-8px>
                        <span onClick={onCancel}>取消</span>
                        <span>时间选择</span>
                        <span onClick={() => onConfirm?.(valueTime.current.date)}>确定</span>
                  </div>
                  <div flex>
                        <Column className='grow-1' items={yearList} value={valueTime.current.year}
                              onChange={year => { valueTime.current.year = year; update({}) }} />
                        <Column className='grow-1' items={monthList} value={valueTime.current.month}
                              onChange={month => { valueTime.current.month = month; update({}) }} />
                        <Column className='grow-1' items={dayList} value={valueTime.current.day}
                              onChange={day => { valueTime.current.day = day; update({}) }} />
                  </div>
            </div>
      )
}
type ColumnProps = {
      className?: string
      itemHeight?: number
      value: number
      items: number[]
      visible?: boolean
      onChange: (value: number) => void
      onClose?: () => void
      onConfirm?: (time: Date) => void
}

export const Column: React.FC<ColumnProps> = (props) => {
      const { itemHeight = 36, className, items, value, onChange } = props
      const [isTouching, setIsTouching] = useState(false)
      const [lastY, setLastY] = useState(-1)
      const index = items.indexOf(value)
      const [translateY, _setTranslateY] = useState(index * -itemHeight)
      useEffect(() => {
            const index = items.indexOf(value)
            setTranslateY(index * -itemHeight)
      }, [value])

      const setTranslateY = (y: number) => {
            // if (y > 0) { y = 0 }
            y = Math.min(y, 0)
            y = Math.max(y, (items.length - 1) * -itemHeight)
            _setTranslateY(y)
      }
      return (

            <div className={className} h='50vh' overflow-hidden relative
                  onTouchStart={(e) => {
                        setIsTouching(true)
                        setLastY(e.touches[0].clientY)
                  }}
                  onTouchMove={(e) => {
                        if (isTouching) {
                              const y = e.touches[0].clientY
                              const dy = y - lastY
                              setTranslateY(translateY + dy)
                              setLastY(y)
                        }
                  }}
                  onTouchEnd={() => {
                        const remainder = translateY % itemHeight
                        let y = translateY - remainder
                        if (Math.abs(remainder) > 18) {
                              y += itemHeight * (remainder > 0 ? 1 : -1)
                        }
                        setTranslateY(y)
                        setIsTouching(false)
                        //确定选择到当前的第几项，距离/item的高度
                        onChange(items[Math.abs(y / itemHeight)])

                  }} >
                  <div border-b-1 border-t-1 b="#eee" absolute top="50%" w-full
                        style={{ height: itemHeight, transform: `translateY(${-itemHeight / 2}px)` }} />
                  <div absolute top="50%" w-full style={{ transform: `translateY(${-itemHeight / 2}px)` }}>
                        <ol style={{ transform: `translateY(${translateY}px)` }} text-center children-flex children-items-center children-justify-center>
                              {items.map(item => <li key={item} style={{ height: itemHeight }}>{item}</li>)}
                        </ol>
                  </div >
            </div >
      )
}

