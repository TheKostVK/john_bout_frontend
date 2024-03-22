import React from "react";
import { message } from 'antd';
import { ArgsProps } from 'antd/lib/message';

/**
 * Типы для различных уведомлений.
 **/
type MessageType = 'success' | 'info' | 'warning' | 'error' | 'loading';

/**
 * Интерфейс для уведомления.
 **/
interface MessageData {
    /**
     * Ключ уведомления в DOM древе для обновления содержимого.
     **/
    key: string;

    /**
     * Тип уведомления.
     * Может быть одним из: 'success', 'info', 'warning', 'error', 'loading'.
     **/
    type: MessageType;

    /**
     * Иконка уведомления.
     **/
    icon?: React.ReactNode;

    /**
     * Класс стилей для уведомления.
     **/
    className?: string;

    /**
     * Стили для уведомления.
     **/
    style?: React.CSSProperties;

    /**
     * Длительность уведомления в секундах (по умолчанию 5, 0 - вечное отображение).
     **/
    duration?: number;

    /**
     * Содержимое уведомления.
     **/
    content: string;

    /**
     * Функция обратного вызова при клике на уведомлении.
     **/
    onClick?: () => void;

    /**
     * Функция обратного вызова при закрытии уведомления.
     **/
    onClose?: () => void;
}

/**
 * Интерфейс для утилиты уведомлений.
 **/
interface MessageUtility {
    /**
     * Метод для отображения уведомления.
     **/
    showMessage: (messageData: MessageData, contextHolder?: HTMLElement) => void;

    /**
     * Метод для уничтожения сообщения по ключу.
     **/
    destroyMessage: (key: string) => void;
}

/**
 * Настройка уведомлений.
 */
message.config({
    /**
     * Отступ сверху.
     */
    top: 5,

    /**
     * Кол-во уведомлений отображаемых одновременно (оптимально 2).
     */
    maxCount: 2,

    /**
     * Время показа уведомления
     */
    duration: 5,

    /**
     * Возвращает узел монтирования для сообщения.
     */
    getContainer: () => document.body

    /**
     * Включение rtl режима.
     */
    // rtl: true,

    /**
     * Префикс для стилей.
     */
    // prefixCls: 'messageUtilityShowMessage',
});

/**
 * Утилита работы с уведомлениями.
 **/
const messageUtility: MessageUtility = {
    /**
     * Отображает уведомление с использованием Ant Design message.open
     * @param messageData - конфигурация сообщения.
     * @param contextHolder - узел монтирования для сообщения (необязательно).
     **/
    showMessage: (messageData: MessageData, contextHolder: HTMLElement = document.body): void => {
        const { key, type, icon, className, style, duration = 5, content, onClick, onClose }: MessageData = messageData;

        message.open({
            key,
            type,
            icon,
            className,
            style,
            duration,
            content,
            getContainer: () => contextHolder,
            onClick,
            onClose,
        } as ArgsProps).then((): void => {
            // Ничего
        });
        ;
    },

    /**
     * Уничтожает сообщение по ключу.
     * @param key - ключ сообщения.
     */
    destroyMessage: (key: string): void => {
        message.destroy(key);
    }
};

export default messageUtility;