using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sh.Knockout
{
    public class PageViewModel
    {
        private int _index;
        /// <summary>
        /// 第几页
        /// </summary>
        public int Index
        {
            get
            {
                if (_index < 1)
                {
                    _index = 1;
                }
                if (Totaile < _index)
                {
                    _index = Totaile;
                }
                return _index;

            }
            set { _index = value; }
        }

        /// <summary>
        /// 页面大小
        /// </summary>
        public int Size { get; set; } = 20;

        public string ActionString { get; set; }
        /// <summary>
        /// 总页数
        /// </summary>

        public int Totaile
        {
            get
            {
                var a = Count / Size;
                a = Count % Size != 0 ? ++a : a;
                return a;
            }
        }
        private int showCount = 5;
        /// <summary>
        /// 显示信息
        /// </summary>
        public List<int> List
        {
            get
            {
                var result = new List<int>();
                if (Totaile <= showCount)
                {
                    for (int i = 1; i <= Totaile; i++)
                    {
                        result.Add(i);
                    }
                }
                else
                {
                    if (Index <= showCount / 2 + 1)
                    {
                        for (int i = 1; i <= 5; i++)
                        {
                            result.Add(i);
                        }
                    }
                    else if ((Index + showCount / 2 + 1) >= Totaile)
                    {

                        for (int i = Totaile - showCount; i <= Totaile; i++)
                        {
                            result.Add(i);
                        }
                    }
                    else
                    {
                        for (int i = Index - (showCount / 2 + 1); i < Index + (showCount / 2 + 1); i++)
                        {
                            result.Add(i);
                        }
                    }
                }
                return result;
            }
        }
        public int Count { get; set; }
    }



    /// <summary>
    /// 分页数据模型
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class PageDataModel<T>
    {
        /// <summary>
        /// 总数
        /// </summary>
        public int Count { get; set; }
        /// <summary>
        /// 数据集合
        /// </summary>
        /// 

        public T Data { get; set; }
        private int _index;
        /// <summary>
        /// 第几页
        /// </summary>
        public int Index
        {
            get
            {

                return _index;
            }
            set { _index = value; }
        }
        public int Size { get; set; } = 20;

        public PageViewModel ToPageViewModel(string ActionString)
        {
            var result = new PageViewModel();
            result.ActionString = ActionString;
            result.Count = Count;
            result.Index = Index;
            result.Size = Size;
            return result;
        }
    }

}
